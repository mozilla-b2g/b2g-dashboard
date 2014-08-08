'use strict';

angular.module('b2gQaDashboardApp')
  .controller('SmoketestsAgeCtrl', function ($scope, IntervalsObject, AGE_RANGES, ONE_WEEK, weeklyChartCommons) {

    $scope.chartData = weeklyChartCommons.initializeDataset();
    $scope.chartOptions = weeklyChartCommons.initializeOptions();

    $scope.$watch('filteredResults', function() {
      var keys = Object.keys(new IntervalsObject(AGE_RANGES));
      weeklyChartCommons.generateSortedResultsAndUpdateChart($scope, keys, generateWeekResults);
    });

    function generateWeekResults(firstDayOfTheWeek) {
      // TODO Make this function more generic
      var weekResults = new IntervalsObject(AGE_RANGES);

      for(var bug_id in $scope.filteredResults) {
        var bug = $scope.filteredResults[bug_id];
        var lastWeek = firstDayOfTheWeek - ONE_WEEK;

        if (bug.hasBeenCreatedSince(firstDayOfTheWeek)  // Get rid of the bugs that are not created yet
          && !bug.hasBeenResolvedSince(lastWeek)) {   // Get rid of the bugs that are already been resolved and counted

          var age = bug.getAgeInDaysAt(firstDayOfTheWeek);
          weekResults.addContent(age, bug.bug_id);
        }
      }
      return weekResults;
    }
  });
