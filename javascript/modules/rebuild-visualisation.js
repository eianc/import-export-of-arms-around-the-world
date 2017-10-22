import * as d3 from 'd3';
import {width, height, exportGroup, importGroup} from './containers';
import createBalloons from './create-balloons.js';
import {calculateForceCollide} from './calculate-forces';

const yearsTrade = d3.select('#years');
let currentYear;

function showYears(list, index) {
    list[index].parentNode.className = 'hide-elipses';
    list[index].parentNode.children[0].innerHTML = list[index].parentNode.children[0].dataset.id;
}

function hideYears(list, index) {
    list[index].parentNode.className = 'show-elipses';
    list[index].parentNode.children[0].innerHTML = '.';
}

/// getting the data entries array only for a year
function getEntriesByYear(data, year = '2016') {
    let entriesByYear;
    data.map(function(d) {
        if (d.year === year) {
            currentYear = year;
            entriesByYear = d.entries;        
        }
    });
    return entriesByYear;
};

function rebuildVisualisation(data, scaleRadius) {

    let dataByYear = getEntriesByYear(data, undefined);
    
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

    let forceExportCollide = calculateForceCollide(scaleRadius, 'exported');
    let forceImportCollide = calculateForceCollide(scaleRadius, 'imported');
        
    buttonList.map(function(list, index) {
        
        function addActiveClassToButton(id, currentYear) {
            for (let i=0; i< buttonList.length; i++) {
                buttonList[i].className = 'button';
            }
            if (id === currentYear) {
                list.className += ' active';
            }
        }
        
        addActiveClassToButton(list.dataset.id, currentYear);
        /// display only the first 5 years, the middle 5 years and the last 5 years
        if ( ( ( index >= 5 ) && ( index <= (buttonListMiddle - 3) ) ) ||
            ( ( index >= (buttonListMiddle + 3) ) && ( index <= ( buttonListLength - 6 ) ) )) {
            list.parentNode.className = 'show-elipses';
            list.innerHTML = '.';
        }

        list.onclick = function() {
            /// get data based by the year we clicked
            dataByYear = getEntriesByYear(data, list.dataset.id);

            currentYear = list.dataset.id;
            addActiveClassToButton(list.dataset.id, currentYear);

            /// clear the svg group 
            d3.selectAll('svg g > *').remove();

            /// calling the export and import functions
            createBalloons(dataByYear, forceExportCollide, exportGroup, 'exported', scaleRadius);
            createBalloons(dataByYear, forceImportCollide, importGroup, 'imported', scaleRadius);

            if ( (index > 3) && (index < (buttonListLength - 4))) {
            
                let currentYearIndex = index;
                let nextSibling = index + 1;
                let prevSibling = index - 1;
                let nextThirdSibling = index + 3;
                let prevThirdSibling = index - 3;

                for (let i = prevSibling; i <= nextSibling; i++ ) {
                    showYears(buttonList,i);
                }
            
                if (prevThirdSibling > 2) {        
                    for (let i = prevThirdSibling; i < prevSibling; i++) {
                        hideYears(buttonList,i);       
                    }
                }

                if (nextThirdSibling < (buttonListLength - 3)) {
                    for (let i = nextSibling + 1; i <= nextThirdSibling; i++) {
                        hideYears(buttonList,i);       
                    }
                }
            }
        };
    });
}

export {rebuildVisualisation, getEntriesByYear};