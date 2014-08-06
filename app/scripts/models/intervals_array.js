'use strict';

angular.module('models').factory('IntervalsArray', function() {

  var IntervalsArray = function(endPoints) {
    this.endPoints = endPoints || [];
    this.intervalsContent = [];

    this.endPoints.forEach(function() {
      this.intervalsContent.push([]);
    }, this)
  };

  IntervalsArray.prototype.addContent = function(value, content) {
    for(var i = 0; i < this.endPoints.length; i++) {
      var lowerBound = this.endPoints[i];
      var upperBound = this.endPoints[i+1] || Number.POSITIVE_INFINITY;

      if (value >= lowerBound && value < upperBound) {
        this.intervalsContent[i].push(content);
      }
    }
  };

  IntervalsArray.prototype.getContent = function(lowerBound) {
    var content = null;
    for(var i = 0; i < this.endPoints.length; i++) {
      if (lowerBound === this.endPoints[i]){
        content = this.intervalsContent[i];
      }
    }
    return content;
  };

  IntervalsArray.prototype.endPointsToString = function(index) {
    var string = this.endPoints[index];
    string += index === this.endPoints.length - 1
              ? '+'
              : '-' + this.endPoints[index+1];
    return string;
  };

  IntervalsArray.prototype.endPointsIndexFromString = function(endPointString) {
    var index = -1;
    for (var i = 0; i < this.endPoints.length; i++) {
      if (this.endPointsToString(i) === endPointString) {
        index = i;
        break;
      }
    }
    return index;
  };

  return IntervalsArray;
});
