'use strict';

angular.module('b2gQaDashboardApp')
  .controller('GoToBugzillaCtrl', function ($scope, bugzilla) {

    $scope.go = function() {
      var bugsIds = [];
      Object.keys($scope.filteredResults).forEach(function(key) {
        var bug = $scope.filteredResults[key];
        bugsIds.push(bug.bug_id);
      });
      bugzilla.open(bugsIds)
    }
  });
