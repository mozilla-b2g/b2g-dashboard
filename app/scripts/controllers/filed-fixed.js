'use strict';

angular.module('b2gQaDashboardApp')
  .controller('FiledFixedCtrl', function ($scope, config, FiledSmoketestsBugsRequest) {
    $scope.data = [];
    $scope.options = {
      series: {
        bars: {
          show: true
        }
      },
      xaxis: {
        mode: 'time'
      }
    };

    var request = new FiledSmoketestsBugsRequest();
    request.execute().then(function() {
      var data = [];

      Object.keys(request.results).forEach(function(key) {
        var timestamp = parseInt(key);
        var bugsCount = request.results[key].length;
        data.push([timestamp, bugsCount])
      });

      $scope.data = [data];
    });
  });
