'use strict';

angular.module('b2gQaDashboardApp')
  .controller('FiledFixedCtrl', function ($scope, es) {
    $scope.data = [];
    $scope.options = {
      series: {
        bars: {
          show: true
        }
      },
      xaxis: {
        mode: "time"
      }
    };


    es.search({
      index: 'qa-dashboard',
      type: 'bugs',
      body: {
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
                },
                {
                  "term": {
                    "keywords": "smoketest"
                  }
                },
                {
                  "exists": {
                    "field": "cf_blocking_b2g"
                  }
                },
                {
                  "not": {
                    "terms": {
                      "cf_blocking_b2g": ["---", "-"]
                    }
                  }
                }
              ]
            }
          }
        },
        "facets": {
          "events_by_creation_time": {
            "date_histogram": {
              "field": "created_ts",
              "interval": "week"
            }
          }
        }
      }
    }).then(function (resp) {
      var data = [];
      resp.facets.events_by_creation_time.entries.forEach(function(entry) {
        data.push([entry.time, entry.count]);
        });
      $scope.data = [data];
    }, function (err) {
      console.trace(err.message);
    })
  });
