'use strict';

angular.module('b2gQaDashboardApp')
  .service('filters', function () {

    var available = {
      cf_blocking_b2g: [
        { name: 'All', value: '' },
        { name: '1.4', value: '1.4' },
        { name: '2.0', value: '2.0' },
        { name: '2.1', value: '2.1' }
      ]
    };

    var selected = getAvailableDefaultValues();

    function getAvailableDefaultValues() {
      var selected = {};
      Object.keys(available).forEach(function (key) {
        selected[key] = available[key][0]
      });
      return selected;
    }

    return {
      available: available,
      selected: selected
    };

  });
