'use strict';

angular.module('services').factory('Base', function(config, $q) {
  function Base(index, type, body) {
    this.index = index || '';
    this.type = type || '';
    this.body = body || {};
    this.results = [];

    return(this);
  }

  Base.prototype.execute = function () {
    var self = this;
    var url = config.databases.bugs.host + '/' + this.index + '/' + this.type + '/_search';

    var deferred = $q.defer();

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onload = function() {
      var response = JSON.parse(xhr.response);
      var results = [];
      response.hits.hits.forEach(function(hit) {
        results.push(hit._source);
      });

      self.results = results;
      deferred.resolve(response);
    };
    xhr.send(JSON.stringify(this.body));

    return deferred.promise;
  };

  return Base;
});
