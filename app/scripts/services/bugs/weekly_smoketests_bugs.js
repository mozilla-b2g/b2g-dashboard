'use strict';

angular.module('services').factory('WeeklySmoketestsBugsRequest', function(SmoketestsBugsRequest) {
  function WeeklySmoketestsBugsRequest() {

    SmoketestsBugsRequest.apply(this, arguments);

    this.body.facets = {
      "weekly_facet": {
        "date_histogram": {
          "interval": "week"
        }
      }
    };

    return(this);
  }

  WeeklySmoketestsBugsRequest.prototype = new SmoketestsBugsRequest();


  WeeklySmoketestsBugsRequest.prototype.execute = function() {
    var self = this;
    var parentExecute = SmoketestsBugsRequest.prototype.execute.apply(this, arguments);

    return parentExecute.then(function(response) {
      var results = {};

      response.facets.weekly_facet.entries.forEach(function(entry) {
        results[entry.time] = [];
      });

      self.results.forEach(function(bug) {
        for (var weekTimeStamp in results) {
          weekTimeStamp = parseInt(weekTimeStamp);
          var weeklyField = self.body.facets.weekly_facet.date_histogram.field;

          if (bug[weeklyField] >= weekTimeStamp && bug[weeklyField] < weekTimeStamp + 7 * 24 * 60 * 60 * 1000) {
            results[weekTimeStamp].push(bug)
          }
        }
      });

      self.results = results;

      return response;
    });
  };

  return WeeklySmoketestsBugsRequest;
});
