'use strict';

angular.module('b2gQaDashboardApp')
  .controller('SmoketestsAgeCtrl', function ($scope, IntervalsObject, AGE_RANGES, weeklyChartCommons) {

    var dataKeys = Object.keys(new IntervalsObject(AGE_RANGES));
    $scope.chartData = weeklyChartCommons.initializeDataset();
    $scope.chartOptions = weeklyChartCommons.initializeOptions();
    $scope.chartOptions.onclick = function(chart) { weeklyChartCommons.onclick(chart, $scope); };
    $scope.chartOptions.groups = [dataKeys];
    $scope.chartOptions.colors = weeklyChartCommons.linkColors(dataKeys, ['green', 'orange', 'red']);

    $scope.$watch('filteredResults', function() {
      weeklyChartCommons.generateSortedResultsAndUpdateChart($scope, dataKeys, generateWeekResults);
    });

    function generateWeekResults(lastDayOfTheWeek) {
      // TODO Make this function more generic
      var weekResults = new IntervalsObject(AGE_RANGES);

      for(var bugId in $scope.filteredResults) {
        var bug = $scope.filteredResults[bugId];
        if (bug.wasOpenDuringWeek(lastDayOfTheWeek)) {
          var age = bug.getAgeInDaysAt(lastDayOfTheWeek);
          weekResults.addContent(age, bug.id);
        }
      }
      return weekResults;
    }
  });
