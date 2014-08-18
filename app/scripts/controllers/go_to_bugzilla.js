'use strict';

angular.module('dashboardApp')
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
