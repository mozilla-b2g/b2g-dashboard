'use strict';

angular.module('services').factory('FiledSmoketestsBugsRequest', function(SmoketestsBugsRequest) {
  function FiledSmoketestsBugsRequest() {

    SmoketestsBugsRequest.apply(this, arguments);

    this.body.facets = {
      "events_by_creation_time": {
        "date_histogram": {
          "field": "created_ts",
          "interval": "week"
        }
      }
    };

    return(this);
  }

  FiledSmoketestsBugsRequest.prototype = new SmoketestsBugsRequest();


  FiledSmoketestsBugsRequest.prototype.execute = function() {
    var self = this;
    var parentExecute = SmoketestsBugsRequest.prototype.execute.apply(this, arguments);

    return parentExecute.then(function(response) {
      var results = {};

      response.facets.events_by_creation_time.entries.forEach(function(entry) {
        results[entry.time] = [];
      });

      self.results.forEach(function(bug) {
        for (var weekTimeStamp in results) {
          weekTimeStamp = parseInt(weekTimeStamp);
          if (bug.created_ts >= weekTimeStamp && bug.created_ts < weekTimeStamp + 7 * 24 * 60 * 60 * 1000) {
            results[weekTimeStamp].push(bug)
          }
        }
      });

      self.results = results;

      return response;
    });
  };

  return FiledSmoketestsBugsRequest;
});
