'use strict';

angular.module('b2gQaDashboardApp')
  .controller('SmoketestsFiledFixedCtrl', function ($scope, ONE_WEEK, weeklyChartCommons) {

    $scope.chartData = weeklyChartCommons.initializeDataset();
    $scope.chartOptions = weeklyChartCommons.initializeOptions();

    $scope.$watch('filteredResults', function() {
      var keys = ['Filed', 'Fixed'];
      weeklyChartCommons.generateSortedResultsAndUpdateChart($scope, keys, generateWeekResults);
    });

    function generateWeekResults(firstDayOfTheWeek) {
      // TODO Make this function more generic
      var weekResults = { Filed: [], Fixed: [] };

      for(var bug_id in $scope.filteredResults) {
        var bug = $scope.filteredResults[bug_id];
        var lastWeek = firstDayOfTheWeek - ONE_WEEK;
        var nextWeek = firstDayOfTheWeek + ONE_WEEK;

        if (bug.hasBeenCreatedSince(firstDayOfTheWeek)  // Get rid of the bugs that are not created yet
          && !bug.hasBeenResolvedSince(lastWeek)) {   // Get rid of the bugs that have already been resolved and counted
          weekResults.Filed.push(bug.bug_id);
        }

        if (bug.hasBeenResolvedSince(nextWeek) && bug.cf_last_resolved > firstDayOfTheWeek) {
          weekResults.Fixed.push(bug.bug_id);
        }
      }
      return weekResults;
    }
  });
