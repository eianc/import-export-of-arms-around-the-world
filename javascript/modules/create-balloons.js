import * as d3 from 'd3';
import {width, height} from './containers';
import {forceX, forceY} from './calculate-forces';

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
        return '#0064df';
    }
}

/// create the simulation
function createSimulation(forceCollide) {
    return d3.forceSimulation()
        .force('x', forceX)
        .force('y', forceY)
        .force('collide', forceCollide);
}

/// append the ballons to the DOM
function appendBalloons(data, container, activity, scaleRadius) {
    return container.selectAll('.balloon')
        .data(data)
        .enter().append('circle')
        /// set the radius based on the value exported/imported
        .attr('r', function(d) {
            return scaleRadius(d[activity]);
        })
        /// color fill is calculated based on the continent
        .attr('fill', function(d) {
            return colorFill(d);
        });
}

/// append the name of the country as text
function appendTitle(container) {
    return container.append('title')
        .text(function(d) {
            return d.country;
        });
}

/// remove the balloons which have the radius 0
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

    /// Force simulation
    let simulation = createSimulation(forceCollide);

    let balloons = appendBalloons(data, group, activity, scaleRadius)
    
    /// append the title for each country
    appendTitle(balloons);
    
    /// remove the circles that have the export/import 0
    removeEmptyBalloons(balloons, activity);

    simulation.nodes(data)
    .on('tick', function() {
        ticked(balloons);
    });
}

export default createBalloons;