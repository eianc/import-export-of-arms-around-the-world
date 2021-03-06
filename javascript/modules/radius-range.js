import * as d3 from 'd3';

function calculateMaxByYear(json, activity) {
    return json.map(function(obj) {
        let maxByYear = [];
        obj.entries.map( function(entry) {
            maxByYear.push(parseFloat(entry[activity]));
        });
        return d3.max(maxByYear, function(d) { return d; });
    });
}

function getRadiusRange(json) {
  
    let maxExportYears = calculateMaxByYear(json, 'exported');
    let maxImportYears = calculateMaxByYear(json, 'imported');

    /// calculate the maximum Export across all years
    let maxExport = d3.max(maxExportYears, function(d) {return d;} );

    /// calculate the maximum Import across all years
    let maxImport = d3.max(maxImportYears, function(d) {return d;} );

    /// calculate the maximum between maxExport and maxImport
    let maximum = d3.max([maxExport, maxImport], function(d) {return d;});
 
    /// create the scale for the radius
    let scaleRadius = d3.scaleSqrt().domain([0, maximum]).range([0,150]);

    return scaleRadius;
}

export default getRadiusRange;