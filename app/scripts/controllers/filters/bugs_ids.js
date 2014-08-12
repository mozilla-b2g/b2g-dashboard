'use strict';

angular.module('b2gQaDashboardApp')
  .controller('BugsIdsFilterCtrl', function ($scope, filters) {

    $scope.availableFilters = filters.available;
    $scope.selectedFilters = filters.selected;

    $scope.$watch('bugsIds', function(newValue, oldValue) {
      if (typeof newValue !== 'undefined') {
        var bugsIdsStrings = newValue.split(',');
        var bugsIds = [];
        var hasFailed = false;

        bugsIdsStrings.some(function(bugIdString) {
          var id = parseInt(bugIdString);
          if (!isNaN(bugIdString) // Avoid '123adc' to be considered as '123'
              && !isNaN(id)) {    // Avoid '' to be considered as 0
            bugsIds.push(id);
          } else if (bugIdString !== '') {
            hasFailed = true;
          }
          return hasFailed;
        });

        if (hasFailed) {
          $scope.bugsIds = oldValue;
        } else {
          $scope.selectedFilters.bugsIds = bugsIds;
        }
      }
    });

    $scope.$watchCollection('selectedFilters.bugsIds', function() {
      if (typeof $scope.selectedFilters.bugsIds !== 'undefined') {
        $scope.bugsIds = $scope.selectedFilters.bugsIds.join(', ');
      }
    });

  });
