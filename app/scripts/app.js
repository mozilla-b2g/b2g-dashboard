'use strict';

/**
 * @ngdoc overview
 * @name b2gQaDashboardApp
 * @description
 * # b2gQaDashboardApp
 *
 * Main module of the application.
 */
var app = angular
  .module('b2gQaDashboardApp', [
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'ui.bootstrap',
    'elasticsearch',
    'angularChart',
    'services',
    'constants'
  ]);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.config(function($httpProvider) {
  // TODO: Make CORS calls less permissive
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
