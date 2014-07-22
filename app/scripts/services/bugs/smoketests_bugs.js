'use strict';

angular.module('services').factory('SmoketestsBugsRequest', function(BugsRequest) {
  function SmoketestsBugsRequest() {

    BugsRequest.apply(this, arguments);

    this.body.query.filtered.filter.and.push(
      {
        "term": {
          "keywords": "smoketest"
        }
      },
      {
        "exists": {
          "field": "cf_blocking_b2g" // Filter out old smoketests bugs
        }
      },
      {
        "not": {
          "terms": {
            "cf_blocking_b2g": ["---", "-"] // Filter out current smoketest bugs unrelated to b2g
          }
        }
      }
    );

    return(this);
  }

  SmoketestsBugsRequest.prototype = new BugsRequest();

  return SmoketestsBugsRequest;
});
