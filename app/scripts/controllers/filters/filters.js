'use strict';

angular.module('b2gQaDashboardApp')
  .service('filters', function () {

    var available = {
      cf_blocking_b2g: [
        { name: '- All -', value: '' }
      ]
    };

    var selected = getAvailableDefaultValues();

    var generateAvailable = function(smoketests) {
      Object.keys(smoketests).forEach(function(bugId){
        var bug = smoketests[bugId];
        var value = { name: bug.cf_blocking_b2g, value: bug.cf_blocking_b2g };
        addAvailable('cf_blocking_b2g', value);
      })
    };

    function getAvailableDefaultValues() {
      var selected = {};
      Object.keys(available).forEach(function (key) {
        selected[key] = available[key][0]
      });
      return selected;
    }

    function addAvailable(key, value) {
      if (typeof available[key] === 'undefined') {
        available[key] = [];
      }

      var hasBeenFound = false;
      available[key].some(function(filter) {
        hasBeenFound = (filter.name === value.name);
        return hasBeenFound;
      });

      if (!hasBeenFound) {
        available[key].push(value);
      }
    }

    return {
      available: available,
      selected: selected,
      generateAvailable: generateAvailable
    };

  });
