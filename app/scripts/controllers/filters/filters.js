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
        var version = removeTrailingPlusOrQuestionMark(bug.cf_blocking_b2g);
        var value = { name: version, value: version };
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

    function removeTrailingPlusOrQuestionMark(string) {
      var lastChar = string.slice(-1);
      return ['+', '?'].indexOf(lastChar) === -1 ? string : string.slice(0, -1);
    }

    return {
      available: available,
      selected: selected,
      generateAvailable: generateAvailable
    };

  });
