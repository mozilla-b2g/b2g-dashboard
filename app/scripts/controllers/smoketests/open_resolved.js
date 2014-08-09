'use strict';

angular.module('b2gQaDashboardApp')
  .controller('SmoketestsOpenResolvedCtrl', function ($scope, weeklyChartCommons) {

    $scope.chartData = weeklyChartCommons.initializeDataset();
    $scope.chartOptions = weeklyChartCommons.initializeOptions();

    var keys = ['Open', 'Resolved'];

    $scope.$watch('filteredResults', function() {
      weeklyChartCommons.generateSortedResultsAndUpdateChart($scope, keys, generateWeekResults);
    });

    function generateWeekResults(lastDayOfTheWeek) {
      var weekResults = {};

      keys.forEach(function(key) {
        weekResults[key] = []
      });

      for(var bug_id in $scope.filteredResults) {
        var bug = $scope.filteredResults[bug_id];
        if (bug.wasOpenDuringWeek(lastDayOfTheWeek)) {
          weekResults[keys[0]].push(bug.bug_id);
        }

        if (bug.hasBeenResolvedDuringWeek(lastDayOfTheWeek)) {
          weekResults[keys[1]].push(bug.bug_id);
        }
      }
      return weekResults;
    }
  });
