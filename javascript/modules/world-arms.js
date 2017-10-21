import * as d3 from 'd3';
import calculateMax from './calculate-max';

let width = (window.innerWidth * 47) / 100;
let height = window.innerHeight - 100;



export default function arms() {

	let exportsChart = d3.select('#export').append('svg')
                     .attr('width', width).attr('height', height);

  let importsChart = d3.select('#import').append('svg')
							       .attr('width', width).attr('height', height);

  let yearsTrade = d3.select('#years');
  let exportsSVG = d3.select('#export svg');
  let importsSVG = d3.select('#import svg');

  /// create the group for the Exports
  let armsExport = exportsSVG.append('g').attr('transform', 'translate(20,20)');

  /// create the group for the Imports
  let armsImport = importsSVG.append('g').attr('transform', 'translate(20,20)');

  d3.json('/json/world_arms_import_export_by_year_R.json', function(error, json) {
  	if (error) throw error;
    let data = json; 

    let maximum = calculateMax(data);

      /// create the scale for the radius
      let scaleRadius = d3.scaleSqrt().domain([0, maximum]).range([0,150]);

    console.log(scaleRadius, 'scaleRadius');

    /// set-up the forces
    let forceX = d3.forceX(width / 2).strength(0.6);
    let forceY = d3.forceY(height / 2).strength(0.4);
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
        exportFN(newData);
        importFN(newData);

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

  	/// Create the circles for each country that exports arms
  	function exportFN(data) {
      
      /// Force simulation for Export
      let simulationExport = d3.forceSimulation()
        .force('x', forceX)
        .force('y', forceY)
        .force('collide', forceExportCollide);

      let balloonsExport = armsExport.selectAll('.balloon')
    						          .data(data)
    						          .enter().append('circle')
                          .attr('r', function(d) { return scaleRadius(d.exported); })
            		          .attr('fill', function(d) { return colorFill(d); })
    	
      /// append the title for each country that exports
      balloonsExport.append('title').text(function(d) { return d.country + ' ' + d.exported; });
      
      /// remove the circles that have the export 0
      balloonsExport.filter(function(d) { return d.exported === '0'; }).remove();

      simulationExport.nodes(data)
        .on('tick', function() {
          ticked(balloonsExport);
        });
    }
    exportFN(newData);

    /// Create the circles for each country that imports arms
    function importFN(data) {
      /// Force simulation for Import
      let simulationImport = d3.forceSimulation()
        .force('x', forceX)
        .force('y', forceY)
        .force('collide', forceImportCollide);
  
      let ballonsImport = armsImport.selectAll('.balloon')
                          .data(data)
                          .enter().append('circle')
                          .attr('r', function (d) { return scaleRadius(d.imported); })
                          .attr('fill', function(d) { return colorFill(d); });
      
      /// append the title for each country that imports
      ballonsImport.append('title').text(function(d) { return d.country; });

      /// remove the circles that have the import 0
      ballonsImport.filter(function (d) { return d.imported === '0'; }).remove();

      simulationImport.nodes(data)
        .on('tick', function () {
          ticked(ballonsImport);
        });
    }
    importFN(newData);

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
        return '#114483';
      }
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

  });


};
