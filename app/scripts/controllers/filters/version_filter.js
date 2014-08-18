'use strict';

angular.module('b2gQaDashboardApp')
  .controller('VersionFilterCtrl', function ($scope, filters, FiltersCookies) {

    $scope.availableFilters = filters.available;
    $scope.selectedFilters = filters.selected;

    $scope.toggleSelection = function toggleSelection(version) {
      var selectedVersions = angular.copy($scope.selectedFilters.versions);
      var idx = $scope.selectedFilters.versions.indexOf(version);

      if (idx > -1) {
        selectedVersions.splice(idx, 1);
      } else {
        selectedVersions.push(version);
      }

      $scope.selectedFilters.versions = selectedVersions;
      FiltersCookies.setVersionFilter(selectedVersions);
    };

  });
