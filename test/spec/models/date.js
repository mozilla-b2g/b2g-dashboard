'use strict';

describe('Models: Date', function () {

  describe('getWorkingDaysBetween', function() {

    var JUNE = 5;
    var MORNING = 8;

    var SUNDAY = new Date(2014, JUNE, 1);
    var MONDAY_MIDNIGHT = new Date(2014, JUNE, 2);
    var MONDAY_MORNING = new Date(2014, JUNE, 2, MORNING);
    var MONDAY_11PM = new Date(2014, JUNE, 2, 23);
    var TUESDAY_MORNING = new Date(2014, JUNE, 3, MORNING);
    var WEDNESDAY_MIDNIGHT = new Date(2014, JUNE, 4);
    var SARTUDAY_MIDNIGHT = new Date(2014, JUNE, 7);
    var NEXT_MONDAY_MIDNIGHT = new Date(2014, JUNE, 9);
    var NEXT_MONDAY_MORNING = new Date(2014, JUNE, 9, MORNING);

    it('should return 0 if less than 24 hours', function () {
      var businessDays = Date.getWorkingDaysBetween(MONDAY_11PM, TUESDAY_MORNING);
      expect(businessDays).toBe(0);
    });

    it('should return 1 if 25 hours', function () {
      var businessDays = Date.getWorkingDaysBetween(MONDAY_11PM, WEDNESDAY_MIDNIGHT);
      expect(businessDays).toBe(1);
    });

    it('should return 0 if date are not in the chronological order', function () {
      var businessDays = Date.getWorkingDaysBetween(WEDNESDAY_MIDNIGHT, MONDAY_11PM);
      expect(businessDays).toBe(0);
    });

    it('should return 5 for an entire work week', function () {
      var businessDays = Date.getWorkingDaysBetween(MONDAY_MIDNIGHT, SARTUDAY_MIDNIGHT);
      expect(businessDays).toBe(5);
    });

    it('should return 0 for an entire weekend', function () {
      var businessDays = Date.getWorkingDaysBetween(SARTUDAY_MIDNIGHT, NEXT_MONDAY_MIDNIGHT);
      expect(businessDays).toBe(0);
    });

    it('should return 5 for an entire week', function () {
      var businessDays = Date.getWorkingDaysBetween(MONDAY_MIDNIGHT, NEXT_MONDAY_MIDNIGHT);
      expect(businessDays).toBe(5);
    });

    it('should return 5 for an entire week starting at 8am', function () {
      var businessDays = Date.getWorkingDaysBetween(MONDAY_MORNING, NEXT_MONDAY_MORNING);
      expect(businessDays).toBe(5);
    });

    it('should return 5 for a weekend and an entire week', function () {
      var businessDays = Date.getWorkingDaysBetween(SUNDAY, NEXT_MONDAY_MIDNIGHT);
      expect(businessDays).toBe(5);
    });
  });
});
