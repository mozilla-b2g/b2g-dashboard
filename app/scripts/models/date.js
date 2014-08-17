'use strict';

/* global ONE_DAY */

Date.getWorkingDaysBetween = function(startDateTimestamp, endDateTimestamp) {
  var startDate = new Date(startDateTimestamp);
  var endDate = new Date(endDateTimestamp);

  var days = 0;

  if (startDate < endDate) {
    var milliseconds = endDate - startDate;
    days = Math.floor(milliseconds / ONE_DAY);
    var weeks = Math.floor(days / 7);
    days -= weeks * 2;

    var startDay = startDate.getDay();
    var endDay = endDate.getDay();

    if (startDay - endDay > 1) {  // Remove weekend not previously removed.
      days -= 2;
    }

    if (startDay === 0 && endDay !== 6) { // Remove start day if span starts on Sunday but ends before Saturday
      days -= 1;
    }
  }

  return days;
};
