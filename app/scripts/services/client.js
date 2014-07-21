/*
 * create a service, which provides your elasticsearch client
 * to other parts of your application
 */
angular.module('services.client', ['config'])
  .service('es', function (esFactory, config) {
  return esFactory({
    host: config.databases.bugs.host
  });
});
