'use strict';

angular.module('dashboardApp')
  .controller('ClearFiltersCtrl', function ($scope, filters, FiltersCookies) {

    $scope.clear = function() {
      filters.clearSelected();
      FiltersCookies.clearFilters();
    };

  });
