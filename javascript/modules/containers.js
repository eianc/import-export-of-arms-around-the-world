import * as d3 from 'd3';

const width = (window.innerWidth * 47) / 100;
const height = window.innerHeight - 100;

/// appending the SVG to the main containers
const appendSVGTo = function (container) {
    return d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
};
  
const appendGroupTo = function (container) {
    return container.append('g')
        .attr('transform', 'translate(20,20)');
};

const exportsChart = appendSVGTo('#export');
const importsChart = appendSVGTo('#import');

const exportsSVG = d3.select('#export svg');
const importsSVG = d3.select('#import svg');

/// create the group for the Exports/Imports
const exportGroup = appendGroupTo(exportsSVG);
const importGroup = appendGroupTo(importsSVG);

export {
	width, height, exportGroup, importGroup
}