'use strict';

angular.module('b2gQaDashboardApp')
  .controller('SmoketestsOpenResolvedCtrl', function ($scope, weeklyChartCommons) {

    var dataKeys = ['Open', 'Resolved'];
    $scope.chartData = weeklyChartCommons.initializeDataset();
    $scope.chartOptions = weeklyChartCommons.initializeOptions();
    $scope.chartOptions.onclick = function(chart) { weeklyChartCommons.onclick(chart, $scope); };
    $scope.chartOptions.colors = weeklyChartCommons.linkColors(dataKeys, ['orange', 'green']);

    $scope.$watch('filteredResults', function() {
      weeklyChartCommons.generateSortedResultsAndUpdateChart($scope, dataKeys, generateWeekResults);
    });

    function generateWeekResults(lastDayOfTheWeek) {
      var weekResults = {};

      dataKeys.forEach(function(key) {
        weekResults[key] = []
      });

      for(var bug_id in $scope.filteredResults) {
        var bug = $scope.filteredResults[bug_id];
        if (bug.wasOpenDuringWeek(lastDayOfTheWeek)) {
          weekResults[dataKeys[0]].push(bug.bug_id);
        }

        if (bug.hasBeenResolvedDuringWeek(lastDayOfTheWeek)) {
          weekResults[dataKeys[1]].push(bug.bug_id);
        }
      }
      return weekResults;
    }
  });
