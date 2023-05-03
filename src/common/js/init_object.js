//will assume incoming data includes all counties.  countyfips=1 will be used for all data breadth calcs

//var jsonData = require("pop_county_year.json");


module.exports = function() {


 
    
        var CMap = function(data) {

            /*var jsonData = $.get("data/pop_county_year.json", function(data){
                jsonData = JSON.parse(data);
                console.log(jsonData);
                return jsonData;
            })*/
            
            /*var request = new XMLHttpRequest();  
            request.open("GET", "data/pop_county_year.csv", false);   
            request.send(null);  

            var csvData = new Array();
            var jsonObject = request.responseText.split(/\r?\n|\r/);
            for (var i = 0; i < jsonObject.length; i++) {
              csvData.push(jsonObject[i].split(','));
            }*/

            /* function getData(year) {

              var fips_str = "1,3,5,7,9,11,13,14,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125";    
              var data = $.ajax({
               url: "https://gis.dola.colorado.gov/lookups/components?county="+fips_str+"&year="+year,
               dataType: 'json',
               async: false,

               });
                console.log("https://gis.dola.colorado.gov/lookups/components?county="+fips_str+"&year="+year);
              return data.responseJSON;

            }
            
            console.log("Passed");
*/


            var fips_array = [1, 3, 5, 7, 9, 11, 13, 14, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99, 101, 103, 105, 107, 109, 111, 113, 115, 117, 119, 121, 123, 125];
             

            
            

            this.data = data;
            this.alldata = this.data;


            var first_year = function() {
                var low_year_value = 5000;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].year < low_year_value) {
                        low_year_value = data[i].year;
                    }
                }
                return low_year_value;
            }();
            this.first_year = first_year;

            var last_year = function() {
                var high_year_value = 0;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].year > high_year_value) {
                        high_year_value = data[i].year;
                    }
                }
                return high_year_value;
            }();
            this.last_year = last_year;

            var number_of_years = function() {
                return (last_year - first_year);
            }();
            this.number_of_years = number_of_years;
            
            //var jsonData = getData(first_year);
            
            /* POPULATION */

            /* this.retrieveCountyPop = function(fips, year) {
                var agepop = 0;
                for (let i = 0; i < data.length; i++) {
                        if (data[i].countyfips === fips && data[i].year === year && data[i].datatype === 'netmigration') {
                            agepop = agepop + parseInt(data[i].value);
                        }
                    }
                    console.log("Agepop " + agepop);
                return agepop; 
            }
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //just do 0 to number of age categories
            this.retrieveTtlCountyPop = function(fips, year) {
                
                var allpop = 0;
                for (let j = 0; j < jsonData.length; j++) {

                    if (parseInt(jsonData[j].countyfips) === fips && parseInt(jsonData[j].year) === year) {

                    allpop = jsonData[j].estimate;
                        console.log(allpop);
                    }
                        
                }
                return allpop;
                                             
            }

            this.retrieveTtlPopChg = function(fips) {
                return (this.retrieveCountyPop(fips, last_year) - this.retrieveCountyPop(fips, first_year));
            }

            this.retrieveTtlPop = function(fips) {
                return this.retrieveCountyPop(fips, first_year);
            }

            this.getMaxTtlChange = function() {
                var max_value = -Infinity;
                for (let i = 0; i < fips_array.length; i++) {
                    var current_county = (this.retrieveCountyPop(fips_array[i], last_year) - this.retrieveCountyPop(fips_array[i], first_year));
                    if (current_county > max_value) {
                        max_value = current_county;
                    }
                }
                return max_value;
            }

            this.getMinTtlChange = function() {
                var min_value = Infinity;
                for (let i = 0; i < fips_array.length; i++) {
                    var current_county = (this.retrieveCountyPop(fips_array[i], last_year) - this.retrieveCountyPop(fips_array[i], first_year));
                    if (current_county < min_value) {
                        min_value = current_county;
                    }
                }
                return min_value;
            }

             this.getMaxTtl = function() {
                var max_value = -Infinity;
                for (let i = 0; i < fips_array.length; i++) {
                    var current_county = this.retrieveCountyPop(fips_array[i], first_year);
                    if (current_county > max_value) {
                        max_value = current_county;
                    }
                }
                return max_value;
            }

            this.getMinTtl = function() {
                var min_value = Infinity;
                for (let i = 0; i < fips_array.length; i++) {
                    var current_county = this.retrieveCountyPop(fips_array[i], first_year);
                    if (current_county < min_value) {
                        min_value = current_county;
                    }
                }
                return min_value;
            }


            this.retrieveAvgPopChg = function(fips) {
                return (this.retrieveTtlPopChg(fips) / number_of_years);
            }


            this.getMaxAvgPopChg = function() {
                var max_value = -Infinity;
                for (let i = 0; i < fips_array.length; i++) {
                    var current_county = parseFloat(this.retrieveAvgPopChg(fips_array[i]));
                    if (current_county > max_value) {
                        max_value = current_county;
                    }
                }
                return max_value;
            }

            this.getMinAvgPopChg = function() {
                var min_value = Infinity;
                for (let i = 0; i < fips_array.length; i++) {
                    var current_county = parseFloat(this.retrieveAvgPopChg(fips_array[i]));
                    if (current_county < min_value) {
                        min_value = current_county;
                    }
                }
                return min_value;
            }

            this.getMedianTotalPop = function() {
                var values = [];
                for (let i = 0; i < fips_array.length; i++) {
                    var current_county = parseFloat(this.retrieveTtlPop(fips_array[i]));
                    values.push(current_county);
                }

                values.sort(function(a, b) {
                    return a - b;
                });

                var half = Math.floor(values.length / 2);
                if (values.length % 2)
                    return values[half];
                else
                    return (values[half - 1] + values[half]) / 2.0;
            }

            /* PERCENT POPULATION */

           /*  this.retrievePctPopChg = function(fips) {
                var pctpopchg = ((this.retrieveTtlPopChg(fips) / this.retrieveCountyPop(fips, first_year)) * 100).toFixed(2);
                if (isFinite(pctpopchg)) {
                    return pctpopchg;
                } else {
                    return 0;
                }
            }

            this.retrievePctPop = function(fips) {
                var pctpop = ((this.retrieveTtlPop(fips) / this.retrieveTtlCountyPop(fips, first_year)) * 100).toFixed(2);
                if (isFinite(pctpop)) {
                    return pctpop;
                } else {
                    return 0;
                }
            }

            this.getMaxPctChange = function() {
                var max_value = -Infinity;
                for (let i = 0; i < fips_array.length; i++) {
                    var current_county = parseFloat(this.retrievePctPopChg(fips_array[i]));
                    if (current_county > max_value) {
                        max_value = current_county;
                    }
                }
                return max_value;
            }

            this.getMinPctChange = function() {
                var min_value = Infinity;
                for (let i = 0; i < fips_array.length; i++) {
                    var current_county = parseFloat(this.retrievePctPopChg(fips_array[i]));
                    if (current_county < min_value) {
                        min_value = current_county;
                    }
                }
                return min_value;
            }


            this.retrieveAvgPctPopChg = function(fips) {
                var calc = (((Math.pow((this.retrieveCountyPop(fips, last_year) / this.retrieveCountyPop(fips, first_year)), (1 / number_of_years))) - 1) * 100).toFixed(2);
                if (isFinite(calc)) {
                    return calc;
                } else {
                    return 0;
                }
            }

            this.getMaxAvgPctPopChg = function() {
                var max_value = -Infinity;
                for (let i = 0; i < fips_array.length; i++) {
                    var current_county = parseFloat(this.retrieveAvgPctPopChg(fips_array[i]));
                    if (current_county > max_value) {
                        max_value = current_county;
                    }
                }
                return max_value;
            }

            this.getMinAvgPctPopChg = function() {
                var min_value = Infinity;
                for (let i = 0; i < fips_array.length; i++) {
                    var current_county = parseFloat(this.retrieveAvgPctPopChg(fips_array[i]));
                    if (current_county < min_value) {
                        min_value = current_county;
                    }
                }
                return min_value;
            }

    //Max and min for age percents
            this.getMaxPctPop = function() {
            var max_value = -Infinity;
                for (let i = 0; i < fips_array.length; i++) {
                    var current_county = (this.retrieveCountyPop(fips_array[i], first_year)/this.retrieveTtlCountyPop(fips_array[i], first_year));
                    if (current_county > max_value) {
                        max_value = current_county;
                    }
                }
                return max_value;
        }

        this.getMinPctPop = function() {
            var min_value = Infinity;
                for (let i = 0; i < fips_array.length; i++) {
                    var current_county = (this.retrieveCountyPop(fips_array[i], first_year)/this.retrieveTtlCountyPop(fips_array[i], first_year));
                    if (current_county < min_value) {
                        min_value = current_county;
                    }
                }
                return min_value;
        }

        this.getMedianPctPop = function() {
            var values = [];
            for (let i = 0; i < fips_array.length; i++) {
                var current_county = parseFloat(this.retrievePctPop(fips_array[i]));
                values.push(current_county);
            }

            values.sort(function(a, b) {
                return a - b;
            });

            var half = Math.floor(values.length / 2);
            if (values.length % 2)
                return values[half];
            else
                return (values[half - 1] + values[half]) / 2.0;
        } */
            
            /*this.getMaxPctPop = function() {
                var max_value = -Infinity;
                for (let i = 0; i < fips_array.length; i++) {
                    var current_county = this.retrieveCountyPop(fips_array[i], first_year);
                    if (current_county > max_value) {
                        max_value = current_county;
                    }
                }
                return max_value;
            }

            this.getMinPctPop = function() {
                var min_value = Infinity;
                for (let i = 0; i < fips_array.length; i++) {
                    var current_county = this.retrieveCountyPop(fips_array[i], first_year);
                    if (current_county < min_value) {
                        min_value = current_county;
                    }
                }
                return min_value;
            }*/

            /* MIGRATION */

            this.retrieveCountyMigration = function(fips, year) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].countyfips === fips && data[i].year === year && data[i].datatype === "netmigration") {
                        return Number(data[i].value);
                    }
                }
                return 0;
            }

            this.retrieveCountyMigrationRate = function(fips, year) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].countyfips === fips && data[i].year === year && data[i].datatype === "migrationrate") {
                        return Number(data[i].value);
                    }
                }
                return 0;
            }

            this.retrieveTtlMigration = function(fips) {
                var running_total_migration = 0;
                for (let j = (first_year + 1); j < (last_year + 1); j++) {
                    running_total_migration += this.retrieveCountyMigration(fips, j);
                }
                return running_total_migration;
            }

            this.getMaxTtlMigration = function() {
                var max_value = -Infinity;
                for (let i = 0; i < fips_array.length; i++) {
                    var current_county = this.retrieveTtlMigration(fips_array[i]);
                    if (current_county > max_value) {
                        max_value = current_county;
                    }
                }
                return max_value;
            }

            this.getMinTtlMigration = function() {
                var min_value = Infinity;
                for (let i = 0; i < fips_array.length; i++) {
                    var current_county = this.retrieveTtlMigration(fips_array[i]);
                    if (current_county < min_value) {
                        min_value = current_county;
                    }
                }
                return min_value;
            }


            this.retrieveMigrationRate = function(fips) {
                var running_total = 0;
                for (let j = (first_year + 1); j < (last_year + 1); j++) {
                    running_total += this.retrieveCountyMigrationRate(fips, j);
                }
                return (running_total / number_of_years).toFixed(2);
            }

            this.getMaxMigrationRate = function() {
                var max_value = -Infinity;
                for (let i = 0; i < fips_array.length; i++) {
                    var current_county = parseFloat(this.retrieveMigrationRate(fips_array[i]));
                    if (current_county > max_value) {
                        max_value = current_county;
                    }
                }
                return max_value;
            }

            this.getMinMigrationRate = function() {
                var min_value = Infinity;
                for (let i = 0; i < fips_array.length; i++) {
                    var current_county = parseFloat(this.retrieveMigrationRate(fips_array[i]));
                    if (current_county < min_value) {
                        min_value = current_county;
                    }
                }
                return min_value;
            }

         }

        return CMap; // return constructor function
    //});
}
          