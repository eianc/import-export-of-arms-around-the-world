import * as d3 from 'd3';
import {width, height, exportGroup, importGroup} from './containers';
import getRadiusRange from './radius-range';
import createBalloons from './create-balloons';
import {rebuildVisualisation, getEntriesByYear} from './rebuild-visualisation';
import {calculateForceCollide} from './calculate-forces';

// function forceCollide(scaleRadius, activity) {

// }

export default function arms() {

  d3.json('/json/world_arms_import_export_by_year_R.json', function(error, json) {
  	if (error) throw error;
    let data = json; 

    let scaleRadius = getRadiusRange(data);

    /// save the entries by year in this dataByYear variable
    let dataByYear = getEntriesByYear(data, undefined);

    let forceExportCollide = calculateForceCollide(scaleRadius, 'exported');
    let forceImportCollide = calculateForceCollide(scaleRadius, 'imported');
    
    createBalloons(dataByYear, forceExportCollide, exportGroup, 'exported', scaleRadius);
    createBalloons(dataByYear, forceImportCollide, importGroup, 'imported', scaleRadius);

    rebuildVisualisation(data, scaleRadius);

  });

};
