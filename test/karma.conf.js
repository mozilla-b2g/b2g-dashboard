// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-07-10 using
// generator-karma 0.8.3

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-chart/angular-chart.js',
      'bower_components/elasticsearch/elasticsearch.angular.js',
      'app/scripts/app.js',
      'app/scripts/constants.js',
      'app/scripts/config.js',
      'app/scripts/controllers/weekly_chart.js',
      'app/scripts/controllers/filters/filters.js',
      'app/scripts/controllers/filters/version_filter.js',
      'app/scripts/controllers/smoketests/smoketests.js',
      'app/scripts/controllers/smoketests/filed_fixed.js',
      'app/scripts/controllers/smoketests/age.js',
      'app/scripts/models/models.js',
      'app/scripts/models/bug.js',
      'app/scripts/models/intervals_object.js',
      'app/scripts/services/services.js',
      'app/scripts/services/base.js',
      'app/scripts/services/bugs/bugs.js',
      'app/scripts/services/bugs/smoketests_bugs.js',
      'app/scripts/services/client.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
