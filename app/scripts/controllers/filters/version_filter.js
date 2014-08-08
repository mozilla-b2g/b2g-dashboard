'use strict';

angular.module('b2gQaDashboardApp')
  .controller('VersionFilterCtrl', function ($scope, filters) {

    $scope.availableFilters = filters.available;
    $scope.selectedFilters = filters.selected;

    $scope.setFilter = function(filter) {
      filters.selected.cf_blocking_b2g = filter;
    };

  });
