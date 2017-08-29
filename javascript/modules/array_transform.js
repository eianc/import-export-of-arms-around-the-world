const stats = [];

function yearNotCreated(year) {
    let found = true;
    if(stats.filter(stat => stat.year === year).length) {
        found = false;
    }
    return found;
}

function getYearIndex(year) {
    let yearIndex;
    for(let i = 0; i < stats.length; i++) {
        if (stats[i].year === year) {
            yearIndex = i;
            break;
        }
    }
    return yearIndex;
}


countries.forEach((country) => {
     country.entries.forEach(entry => {
          const newEntry = {
             continent: country.continent,
             country: country.country,
             "import": entry.import,
             "export": entry.export
         };
         if (yearNotCreated(entry.year)) {
             const yearEntry = {
                 year: entry.year,
                 entries: []
             };
             yearEntry.entries.push(newEntry);
             stats.push(yearEntry);
         } else {
            stats[getYearIndex(entry.year)].entries.push(newEntry);
         }
     });
});
console.log(stats);