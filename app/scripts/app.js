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
    'elasticsearch',
    'angular-flot',
    'services'
  ]);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
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
