import * as d3 from 'd3';
import {width, height} from './containers';

/// set-up the forces
let forceX = d3.forceX(width / 2).strength(0.6);
let forceY = d3.forceY(height / 2).strength(0.4);

/// color fill function based on continent
function colorFill(d) {
    if (d.continent === 'Europe') {
        return '#119EAC';
    } else if (d.continent === 'Asia') {
        return '#FEDE25';
    } else if (d.continent === 'Africa') {
        return '#EB6C23';
    } else if (d.continent === 'North America') {
        return '#C64671';
    } else if (d.continent === 'South America') {
        return '#75457C';
    } else if (d.continent === 'Oceania') {
        return '#009CDF';
    }
}

function createSimulation(forceCollide) {
    return d3.forceSimulation()
        .force('x', forceX)
        .force('y', forceY)
        .force('collide', forceCollide);
}

function appendBalloons(data, container, activity, scaleRadius) {
    return container.selectAll('.balloon')
        .data(data)
        .enter().append('circle')
        .attr('r', function(d) {
            return scaleRadius(d[activity]);
        })
        .attr('fill', function(d) {
            return colorFill(d);
        });
}

function appendTitle(container) {
    return container.append('title')
        .text(function(d) {
            return d.country;
        });
}

function removeEmptyBalloons(container, activity) {
    return container.filter(function(d) {
        return d[activity] === '0';
    }).remove();
}

/// this is used by the simulation for the import and export
function ticked(balloon) {
    balloon
        .attr('cx', function(d) {
        return d.x;
        })
        .attr('cy', function(d) {
        return d.y;
        })
}

function createBalloons(data, forceCollide, group, activity, scaleRadius) {

    /// Force simulation for Export
    let simulation = createSimulation(forceCollide);

    let balloons = appendBalloons(data, group, activity, scaleRadius)
    
    /// append the title for each country that exports
    appendTitle(balloons);
    
    /// remove the circles that have the export 0
    removeEmptyBalloons(balloons, activity);

    simulation.nodes(data)
    .on('tick', function() {
        ticked(balloons);
    });
}

export default createBalloons;