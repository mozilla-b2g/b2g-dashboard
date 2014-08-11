'use strict';

angular.module('b2gQaDashboardApp')
  .factory('weeklyChartCommons', function (config, ONE_WEEK, bugzilla) {

    var weeklyChartCommons = {};

    weeklyChartCommons.initializeDataset = function () {
      return {
        schema: [{
          name: 'weekDay',
          type: 'datetime',
          format: ' '
        }],
        records: []
      }
    };

    weeklyChartCommons.initializeOptions = function () {
      return {
        rows: [],
        xAxis: {
          name: 'weekDay',
          displayFormat: '%Y-%m-%d'
        },
        subchart: {
          show: true
        }
      }
    };

    weeklyChartCommons.generateSortedResultsAndUpdateChart = function(scope, keys, generateWeekResults) {
        weeklyChartCommons.clearChart(scope.chartData);
        scope.sortedResults = weeklyChartCommons.buildSortedResults(scope.filteredResults, generateWeekResults);
        weeklyChartCommons.buildChart(scope.sortedResults, scope.chartData, scope.chartOptions, keys);
    };

    weeklyChartCommons.clearChart = function(dataset) { dataset.records.length = 0; };

    weeklyChartCommons.buildSortedResults = function(filteredResults, generateWeekResults) {
      var sortedResults = {};
      var firstBug = filteredResults[Object.keys(filteredResults)[0]] || {};
      var firstBugDate = new Date(firstBug.created_ts); //

      // Get the first day of the week where the first bug has been filed
      var currentWeek = firstBugDate.getDate() - firstBugDate.getDay();
      currentWeek = firstBugDate.setDate(currentWeek);

      var today = Date.now();
      while (currentWeek <= today) {
        sortedResults[currentWeek] = generateWeekResults(currentWeek);
        currentWeek += ONE_WEEK;
      }

      return sortedResults;
    };

    weeklyChartCommons.buildChart = function(sortedResults, dataset, options, keys) {
      keys.forEach(function(key){
        options.rows.push({ name: key, type: 'bar' });
      });

      Object.keys(sortedResults).forEach(function(timestampString) {
        var timestamp = parseInt(timestampString);
        var value = { weekDay: new Date(timestamp) };

        keys.forEach(function(key){
          value[key] = sortedResults[timestamp][key].length;
        });
        dataset.records.push(value);
      });
    };

    weeklyChartCommons.onclick = function (chart, scope) {
      var timestamp = +chart.x;
      var serieName = chart.name;
      var bugsIds = scope.sortedResults[timestamp][serieName];
      bugzilla.open(bugsIds);
    };

    return weeklyChartCommons;

  });
