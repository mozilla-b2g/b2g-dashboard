'use strict';

angular.module('b2gQaDashboardApp')
  .controller('SmoketestsCtrl', function ($scope, config, SmoketestsBugsRequest, filters) {

    $scope.smoketests = {};
    $scope.filteredResults = {};
    $scope.selectedFilters = filters.selected;

    executeRequestAndPushData(new SmoketestsBugsRequest());

    function executeRequestAndPushData(request) {
      request.execute().then(function() {
        $scope.smoketests = request.results;
        $scope.filteredResults = $scope.smoketests;
        filters.generateAvailable($scope.smoketests);
      });
    }

    $scope.$watchCollection('selectedFilters', applySearchFilter);

    function applySearchFilter() {

      $scope.filteredResults = {};
      for(var bugId in $scope.smoketests) {
        var bug = $scope.smoketests[bugId];

        if ($scope.selectedFilters.versions.length > 0 && $scope.selectedFilters.versions.indexOf(bug.getVersion()) !== -1) {
          $scope.filteredResults[bugId] = bug;
        }

        if ($scope.selectedFilters.bugsIds.length > 0 && $scope.selectedFilters.bugsIds.indexOf(bug.id) === -1) {
          delete $scope.filteredResults[bugId];
        }
      }
    }

    $scope.filter = function(bug) {
      filters.selected.bugsIds = [bug.id];
    }
  });
