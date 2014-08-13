'use strict';

angular.module('b2gQaDashboardApp')
  .controller('ClearFiltersCtrl', function ($scope, filters) {

    $scope.clear = function() {
      filters.clearSelected();
    };

  });
