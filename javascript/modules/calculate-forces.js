import * as d3 from 'd3';
import {width, height} from './containers';

/// set-up the forces
let forceX = d3.forceX(width / 2).strength(0.6);
let forceY = d3.forceY(height / 2).strength(0.4);

function calculateForceCollide(scaleRadius, activity) {
    return d3.forceCollide(function(d) {
        return scaleRadius(d[activity]) + 2;
    });
}

export { forceX, forceY, calculateForceCollide }; 
