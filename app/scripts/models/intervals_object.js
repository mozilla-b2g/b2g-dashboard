'use strict';

angular.module('models').factory('IntervalsObject', function() {

  var IntervalsObject = function(endPoints, unit) {
    for(var i = 0; i < endPoints.length; i++) {
      var key = endPointsToString(endPoints, i, unit);
      this[key] = [];
    }
  };

  IntervalsObject.prototype.addContent = function(value, content) {
    for (var key in this) {
      var endPoints = endPointsFromString(key);
      var lowerBound = endPoints[0];
      var upperBound = endPoints[1];

      if (value >= lowerBound && value < upperBound) {
        this[key].push(content);
      }
    }
  };

  function endPointsToString(endPoints, index, unit) {
    var string = endPoints[index];
    string += index === endPoints.length - 1 ? '+' : '-' + endPoints[index+1];
    string += ' ' + unit;
    return string;
  }

  function endPointsFromString(endPointsString) {
    // Expected formats: '0-2 unit' or '4+ unit'
    var valueAndUnit = endPointsString.split(' ');
    var bounds = valueAndUnit[0].split('-');
    var lowerBound = bounds[0].replace('+', '') || 0; // We only handle positive numbers
    var upperBound = bounds[1] || Number.POSITIVE_INFINITY;
    return [lowerBound, upperBound];
  }

  return IntervalsObject;
});
