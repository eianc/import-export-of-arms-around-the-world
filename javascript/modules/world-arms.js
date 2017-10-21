import * as d3 from 'd3';
import calculateMax from './calculate-max';
import {width, height, exportGroup, importGroup} from './containers';
import createBalloons from './create-balloons';

// function forceCollide(scaleRadius, activity) {

// }

export default function arms() {

  const yearsTrade = d3.select('#years');

  d3.json('/json/world_arms_import_export_by_year_R.json', function(error, json) {
  	if (error) throw error;
    let data = json; 

    let maximum = calculateMax(data);

    /// create the scale for the radius
    let scaleRadius = d3.scaleSqrt().domain([0, maximum]).range([0,150]);

    let forceExportCollide = d3.forceCollide(function(d) { return scaleRadius(d.exported) + 2; });
    let forceImportCollide = d3.forceCollide(function(d) { return scaleRadius(d.imported) + 2; });  

    let currentYear;

    /// getting the data entries array only for a year
    function dataEntries(data, year = '2016') {
      let entriesByYear;
      data.map(function(d) {
        if (d.year === year) {
          currentYear = year;
          entriesByYear = d.entries;        
        }
      })
      return entriesByYear;
    };

    /// save the entries by year in this newData variable
    let newData = dataEntries(data, undefined);
    
    /// append the years list to the DOM
    let yearlist = yearsTrade.selectAll('li')
                  .data(data)
                  .enter().append('li')
                  .attr('class', 'hide-elipses')
                  .append('button')
                  .attr('data-id', function(d) { return d.year; })
                  .attr('class', 'button')
                  .text(function(d) { return d.year; });

    /// getting the list with the buttons containing the years
    let buttonList = yearlist._groups[0];
    let buttonListLength = buttonList.length;
    let buttonListMiddle = Math.floor(buttonList.length / 2);
    
    buttonList.map(function(list, index) {
      
      function addActiveClass(id, currentYear) {
        for (let i=0; i< buttonList.length; i++) {
          buttonList[i].className = 'button';
        }
        if(id === currentYear) {
          list.className += ' active';
        }
      }
      
      addActiveClass(list.dataset.id, currentYear);
      /// display only the first 5 years, the middle 5 years and the last 5 years
      if ( ( ( index >= 5 ) && ( index <= (buttonListMiddle - 3) ) ) ||
           ( ( index >= (buttonListMiddle + 3) ) && ( index <= ( buttonListLength - 6 ) ) )) {
        list.parentNode.className = 'show-elipses';
        list.innerHTML = '.';
        
      }
      list.onclick = function() {
        /// get data based by the year we clicked
        newData = dataEntries(data, list.dataset.id);

        currentYear = list.dataset.id;
        addActiveClass(list.dataset.id, currentYear);

        /// clear the svg group 
        d3.selectAll('svg g > *').remove();
        /// calling the export and import functions
        createBalloons(newData, forceExportCollide, exportGroup, 'exported', scaleRadius);
        createBalloons(newData, forceImportCollide, importGroup, 'imported', scaleRadius);

        if ( (index > 3) && (index < (buttonListLength - 4))) {

          
          let currentYearIndex = index;
          let nextSibling = index + 1;
          let prevSibling = index - 1;
          let nextThirdSibling = index + 3;
          let prevThirdSibling = index - 3;

          for (let i = prevSibling; i <= nextSibling; i++ ) {
            showYears(i);
          }
          
          if (prevThirdSibling > 2) {        
            for (let i = prevThirdSibling; i < prevSibling; i++) {
              hideYears(i);       
            }
          }

          if (nextThirdSibling < (buttonListLength - 3)) {
            for (let i = nextSibling + 1; i <= nextThirdSibling; i++) {
              hideYears(i);       
            }
          }
        }
      };

      function showYears(index) {
        buttonList[index].parentNode.className = 'hide-elipses';
        buttonList[index].parentNode.children[0].innerHTML = buttonList[index].parentNode.children[0].dataset.id;
      }

      function hideYears(index) {
        buttonList[index].parentNode.className = 'show-elipses';
        buttonList[index].parentNode.children[0].innerHTML = '.';
      }
    });

    createBalloons(newData, forceExportCollide, exportGroup, 'exported', scaleRadius);
    createBalloons(newData, forceImportCollide, importGroup, 'imported', scaleRadius);

  });

};
