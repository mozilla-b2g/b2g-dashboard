'use strict';

angular.module('b2gQaDashboardApp')
  .factory('weeklyChartCommons', function (config, ONE_WEEK, filters) {

    var today = Date.now();
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
      var currentWeek = getFirstDayOfTheWeek(firstBug.created_ts);
      var lastWeek = getLastWeek(filteredResults);

      while (currentWeek <= lastWeek) {
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
      filters.selected.bugsIds = scope.sortedResults[timestamp][serieName];
      scope.$apply(); // Needed, because this event was not triggered by AngularJS itself
    };

    weeklyChartCommons.linkColors = function (dataKeys, availableColors) {
        var colors = {};
        var i = 0;
        dataKeys.forEach(function(key) {
          colors[key] = availableColors[i];
          i++;
        });
        return colors;
      };

    function getFirstDayOfTheWeek(timestamp) {
      var date = new Date(timestamp);
      var dayOfTheMonth = date.getDate() - date.getDay();
      date.setDate(dayOfTheMonth);
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      return +date
    }

    function findLatestResolvedTimestamp(bugsObject) {
      var oldestResolvedTimestamp = 0;

      Object.keys(bugsObject).every(function(bugKey) {
        var bug = bugsObject[bugKey];
        if (bug.hasEverBeenResolved()) {
          if (oldestResolvedTimestamp < bug.cf_last_resolved) {
            oldestResolvedTimestamp = bug.cf_last_resolved;
          }
        } else {
          oldestResolvedTimestamp = today;
        }
        return bug.hasEverBeenResolved();
      });

      return oldestResolvedTimestamp
    }

    function getLastWeek(bugsObject) {
      var lastWeek = today;
      var lastTimestamp = findLatestResolvedTimestamp(bugsObject);
      if (lastTimestamp !== today) {
        // If the last timestamp is the moment where the last bug has been fixed,
        // we go to the beginning of the week after to show its fix on the chart
        lastWeek = getFirstDayOfTheWeek(lastTimestamp) + ONE_WEEK;
      }
      return lastWeek;
    }

    return weeklyChartCommons;

  });
