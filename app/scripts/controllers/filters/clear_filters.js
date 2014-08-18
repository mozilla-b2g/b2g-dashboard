'use strict';

angular.module('b2gQaDashboardApp')
  .controller('ClearFiltersCtrl', function ($scope, filters, FiltersCookies) {

    $scope.clear = function() {
      filters.clearSelected();
      FiltersCookies.clearFilters();
    };

  });
