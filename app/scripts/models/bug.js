'use strict';

angular.module('models').factory('Bug', function(ONE_WEEK) {

  var UNRESOLVED_TIMESTAMP = -1;
  var UNASSIGNED = 'nobody@mozilla.org';

  var Bug = function(bugId, summary, product, component, status, resolution, createdOn, lastResolvedOn, keywords,
                     blockingB2G, assignedTo, expiresOn) {
    this.id = bugId || 0;
    this.summary = summary || '';
    this.product = product || '';
    this.component = component || '';
    this.status = status || 'unconfirmed';
    this.resolution = resolution || '---';
    this.createdOn = createdOn || UNRESOLVED_TIMESTAMP;
    this.lastResolvedOn = lastResolvedOn || UNRESOLVED_TIMESTAMP;
    this.keywords = keywords || [];
    this.blockingB2G = blockingB2G || '---';
    this.assignedTo = assignedTo || UNASSIGNED;
    this.expiresOn = expiresOn || 9999999999000;

    // Sometimes in Bugzilla, a bug can have the 'new' status and be also assigned
    this.status = this.status === 'new' && this.assignedTo !== UNASSIGNED ? 'assigned' : this.status;
  };

  Bug.prototype.wasOpenDuringWeek = function(lastDayOfTheWeek) {
    var lastWeek = lastDayOfTheWeek - ONE_WEEK;
    return this.hasBeenCreatedSince(lastDayOfTheWeek) && // Was created before the end of the week
            !this.hasBeenResolvedSince(lastWeek);  // But was not resolved before the last week
  };

  Bug.prototype.hasBeenResolvedDuringWeek = function(lastDayOfTheWeek) {
    var lastWeek = lastDayOfTheWeek - ONE_WEEK;
    return this.hasBeenResolvedSince(lastDayOfTheWeek) && !this.hasBeenResolvedSince(lastWeek);
  };

  Bug.prototype.hasBeenCreatedSince = function(timestamp) {
    return this.createdOn <= timestamp;
  };

  Bug.prototype.hasBeenResolvedSince = function(timestamp) {
    return this.hasEverBeenResolved() && this.lastResolvedOn <= timestamp;
  };

  Bug.prototype.getAgeInDaysAt = function(timestamp) {
    var endDate = this.hasBeenResolvedSince(timestamp) ? this.lastResolvedOn : timestamp;
    return Date.getWorkingDaysBetween(this.createdOn, endDate);
  };

  Bug.prototype.getAgeInDays = function() {
    return this.getAgeInDaysAt(Date.now());
  };

  Bug.prototype.hasEverBeenResolved = function() {
    return this.lastResolvedOn > UNRESOLVED_TIMESTAMP;
  };

  return Bug;
});
