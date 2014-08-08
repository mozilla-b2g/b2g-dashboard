'use strict';

angular.module('b2gQaDashboardApp')
  .controller('SmoketestsCtrl', function ($scope, config, SmoketestsBugsRequest) {

    $scope.smoketests = {};
    $scope.filteredResults = {};

    executeRequestAndPushData(new SmoketestsBugsRequest());

    function executeRequestAndPushData(request) {
      request.execute().then(function() {
        $scope.smoketests = request.results;
        $scope.filteredResults = $scope.smoketests;
      });
    }

    $scope.$watch("filters.cf_blocking_b2g", function(newName, oldName) {
        if (newName === oldName) {
          return;
        }
        applySearchFilter();
      }
    );


    function applySearchFilter() {
      var filter = $scope.filters.cf_blocking_b2g.toLowerCase();

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
