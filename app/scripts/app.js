'use strict';

/**
 * @ngdoc overview
 * @name dashboardApp
 * @description
 * # dashboardApp
 *
 * Main module of the application.
 */
var app = angular
  .module('dashboardApp', [
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'ui.bootstrap',
    'angular-toArrayFilter',
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
