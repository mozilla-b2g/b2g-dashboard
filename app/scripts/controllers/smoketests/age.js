'use strict';

angular.module('b2gQaDashboardApp')
  .controller('SmoketestsAgeCtrl', function ($scope, IntervalsObject, AGE_RANGES, weeklyChartCommons) {

    var dataKeys = Object.keys(new IntervalsObject(AGE_RANGES));
    $scope.chartData = weeklyChartCommons.initializeDataset();
    $scope.chartOptions = weeklyChartCommons.initializeOptions();
    $scope.chartOptions.onclick = function (chart) { weeklyChartCommons.onclick(chart, $scope); };
    $scope.chartOptions.groups = [dataKeys];

    $scope.$watch('filteredResults', function() {
      weeklyChartCommons.generateSortedResultsAndUpdateChart($scope, dataKeys, generateWeekResults);
    });

    function generateWeekResults(lastDayOfTheWeek) {
      // TODO Make this function more generic
      var weekResults = new IntervalsObject(AGE_RANGES);

      for(var bug_id in $scope.filteredResults) {
        var bug = $scope.filteredResults[bug_id];
        if (bug.wasOpenDuringWeek(lastDayOfTheWeek)) {
          var age = bug.getAgeInDaysAt(lastDayOfTheWeek);
          weekResults.addContent(age, bug.bug_id);
        }
      }
      return weekResults;
    }
  });
