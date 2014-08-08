'use strict';

angular.module('b2gQaDashboardApp')
  .controller('SmoketestsCtrl', function ($scope, config, SmoketestsBugsRequest, filters) {

    $scope.smoketests = {};
    $scope.filteredResults = {};
    $scope.selectedFilters = filters.selected;
    var checkEquality = true;

    executeRequestAndPushData(new SmoketestsBugsRequest());

    function executeRequestAndPushData(request) {
      request.execute().then(function() {
        $scope.smoketests = request.results;
        $scope.filteredResults = $scope.smoketests;
        filters.generateAvailable($scope.smoketests);
      });
    }

    $scope.$watch('selectedFilters',
      function() { applySearchFilter(); },
      checkEquality
    );

    function applySearchFilter() {
      var filter = $scope.selectedFilters.cf_blocking_b2g.value.toLowerCase();

      if (filter === '') {
        $scope.filteredResults = $scope.smoketests;
        return;
      }

      $scope.filteredResults = {};
      for(var bug_id in $scope.smoketests) {
        var bug = $scope.smoketests[bug_id];
        if (bug.cf_blocking_b2g.indexOf(filter) !== -1) {
          $scope.filteredResults[bug_id] = bug;
        }
      }
    }
  });
