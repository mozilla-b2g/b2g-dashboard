'use strict';

angular.module('services')
  .service('elasticsearch', function (esFactory, config) {
  return esFactory({
    host: config.databases.bugs.host
  });
});
