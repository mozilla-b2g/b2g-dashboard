'use strict';

var ONE_DAY = 24 * 60 * 60 * 1000;
var ONE_WEEK = 7 * ONE_DAY;

angular.module('constants', [])
  .constant('ONE_DAY', ONE_DAY)
  .constant('ONE_WEEK', ONE_WEEK)
  .constant('AGE_RANGES', [0, 2, 4]);
