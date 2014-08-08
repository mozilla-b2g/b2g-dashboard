'use strict';

angular.module('b2gQaDashboardApp')
  .controller('SmoketestsFiledFixedCtrl', function ($scope, weeklyChartCommons) {

    $scope.chartData = weeklyChartCommons.initializeDataset();
    $scope.chartOptions = weeklyChartCommons.initializeOptions();

    $scope.$watch('filteredResults', function() {
      var keys = ['Filed', 'Fixed'];
      weeklyChartCommons.generateSortedResultsAndUpdateChart($scope, keys, generateWeekResults);
    });

    function generateWeekResults(lastDayOfTheWeek) {
      // TODO Make this function more generic
      var weekResults = { Filed: [], Fixed: [] };

      for(var bug_id in $scope.filteredResults) {
        var bug = $scope.filteredResults[bug_id];
        if (bug.wasOpenDuringWeek(lastDayOfTheWeek)) {
          weekResults.Filed.push(bug.bug_id);
        }

        if (bug.hasBeenResolvedDuringWeek(lastDayOfTheWeek)) {
          weekResults.Fixed.push(bug.bug_id);
        }
      }
      return weekResults;
    }
  });
