'use strict';

angular.module('models').factory('Bug', function() {

  var Bug = function(bug_id, short_desc, product, component, bug_status, resolution, created_ts, cf_last_resolved,
                     keywords, cf_blocking_b2g, expires_on) {
    this.bug_id = bug_id || 0;
    this.short_desc = short_desc || '';
    this.product = product || '';
    this.component = component || '';
    this.bug_status = bug_status || 'unconfirmed';
    this.resolution = resolution || '---';
    this.created_ts = created_ts || 0;
    this.cf_last_resolved = cf_last_resolved || 0;
    this.keywords = keywords || [];
    this.cf_blocking_b2g = cf_blocking_b2g || '---';
    this.expires_on = expires_on || 9999999999000;
  };

  Bug.prototype.hasBeenCreatedSince = function(timestamp) {
    return this.created_ts <= timestamp;
  };

  Bug.prototype.hasBeenResolvedSince = function(timestamp) {
    return this.cf_last_resolved > 0 && this.cf_last_resolved < timestamp;
  };

  Bug.prototype.getAgeInDaysAt = function (timestamp) {
    var age = this.hasBeenResolvedSince(timestamp)
      ? this.cf_last_resolved - this.created_ts
      : timestamp - this.created_ts;

    return Math.round(age / (24 * 60 * 60 * 1000));
  };

  return Bug;
});
