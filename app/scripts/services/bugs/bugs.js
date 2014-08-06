'use strict';

angular.module('services').factory('BugsRequest', function(Base, config, Bug) {
  function BugsRequest() {

    Base.apply(this, arguments);

    this.index = config.databases.bugs.index;
    this.type = config.databases.bugs.type;
    this.body = {
      "sort" : [
        {
          "bug_id" : {
            "order" : "asc"
          }
        }
      ],
      "query": {
        "filtered": {
          "query": {
            "match_all": {}
          },
          "filter": {
            "and": [
              {
                "range": {
                  "expires_on": {
                    "gte": Date.now()
                  }
                }
              }
            ]
          }
        }
      },
      "from": 0,
      "size": 200000 // TODO extract in a constant
    };

    return(this);
  }

  BugsRequest.prototype = new Base();

  BugsRequest.prototype.execute = function() {
    var self = this;
    var parentExecute = Base.prototype.execute.apply(this, arguments);

    return parentExecute.then(function(response) {
      var results = [];

      self.results.forEach(function(result){
        results.push(new Bug(
          result.bug_id, result.short_desc, result.product, result.component, result.bug_status, result.resolution,
          result.created_ts, result.cf_last_resolved, result.keywords, result.cf_blocking_b2g, result.expires_on
        ));
      });

      self.results = results;

      return response;
    });
  };

  return BugsRequest;

});
