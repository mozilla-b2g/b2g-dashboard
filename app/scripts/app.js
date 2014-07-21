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
    'services.client'
  ]);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

