'use strict';

angular.module('b2gQaDashboardApp')
  .service('filters', function () {

    var available = {
      versions: []
    };

    var selected = {};
    clearSelected();

    var generateAvailable = function(smoketests) {
      for (var bugId in smoketests) {
        var bug = smoketests[bugId];
        addAvailable('versions', bug.getVersion());
      }

      clearSelected();
    };

    function clearSelected() {
      selected.versions = angular.copy(available.versions);
      selected.bugsIds = [];
    }

    function addAvailable(key, value) {
      var availableFilter = available[key];

      if (typeof availableFilter === 'undefined') {
        availableFilter = [];
      }

      if (availableFilter.indexOf(value) === -1) {
        availableFilter.push(value)
      }
    }

    return {
      available: available,
      selected: selected,
      generateAvailable: generateAvailable,
      clearSelected: clearSelected
    };

  });
