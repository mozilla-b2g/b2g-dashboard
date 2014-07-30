'use strict';

angular.module('services').factory('FixedSmoketestsBugsRequest', function(WeeklySmoketestsBugsRequest) {
  function FixedSmoketestsBugsRequest() {

    WeeklySmoketestsBugsRequest.apply(this, arguments);
    this.body.facets.weekly_facet.date_histogram.field = "cf_last_resolved";
    return(this);
  }

  FixedSmoketestsBugsRequest.prototype = new WeeklySmoketestsBugsRequest();

  return FixedSmoketestsBugsRequest;
});
