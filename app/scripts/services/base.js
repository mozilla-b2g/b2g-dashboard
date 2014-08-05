'use strict';

angular.module('services').factory('Base', function(elasticsearch) {
  function Base(index, type, body) {
    this.index = index || '';
    this.type = type || '';
    this.body = body || {};
    this.results = [];

    return(this);
  }

  Base.prototype.execute = function () {
    var self = this;

    return elasticsearch.search(this).then(function (response) {
      var results = [];

      response.hits.hits.forEach(function(hit) {
        results.push(hit._source);
      });

      self.results = results;

      return response;
    }, function (err) {
      console.trace(err.message);
    });
  };

  return Base;
});
