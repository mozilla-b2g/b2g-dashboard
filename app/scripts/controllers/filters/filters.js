'use strict';

angular.module('b2gQaDashboardApp')
  .service('filters', function () {

    var available = {
      blockingB2G: [
        { name: '- All -', value: '' }
      ],
      bugsIds: [[]]
    };

    var selected = getAvailableDefaultValues();

    var generateAvailable = function(smoketests) {
      for (var bugId in smoketests) {
        var bug = smoketests[bugId];
        var version = removeTrailingPlusOrQuestionMark(bug.blockingB2G);
        var value = { name: version, value: version };
        addAvailable('blockingB2G', value);
      }
    };

    function getAvailableDefaultValues() {
      var selected = {};
      for (var filterName in available) {
        selected[filterName] = available[filterName][0]
      }
      return selected;
    }

    function clearSelected() {
      selected.blockingB2G = available.blockingB2G[0];
      selected.bugsIds = [];
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
      generateAvailable: generateAvailable,
      clearSelected: clearSelected
    };

  });
