'use strict';

angular.module('services').factory('FiledSmoketestsBugsRequest', function(WeeklySmoketestsBugsRequest) {
  function FiledSmoketestsBugsRequest() {

    WeeklySmoketestsBugsRequest.apply(this, arguments);
    this.body.facets.weekly_facet.date_histogram.field = "created_ts";
    return(this);
  }

  FiledSmoketestsBugsRequest.prototype = new WeeklySmoketestsBugsRequest();

  return FiledSmoketestsBugsRequest;
});
