'use strict';

angular.module('b2gQaDashboardApp')
  .controller('GoToBugzillaCtrl', function ($scope, bugzilla) {

    $scope.go = function() {
      var bugsIds = [];
      for(var bugId in $scope.filteredResults) {
        var bug = $scope.filteredResults[bugId];
        bugsIds.push(bug.id);
      }
      bugzilla.open(bugsIds);
    };
  });
