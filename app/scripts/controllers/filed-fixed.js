'use strict';

angular.module('b2gQaDashboardApp')
  .controller('FiledFixedCtrl', function ($scope, config, FiledSmoketestsBugsRequest, FixedSmoketestsBugsRequest) {
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

    executeRequestAndPushData(new FiledSmoketestsBugsRequest());
    executeRequestAndPushData(new FixedSmoketestsBugsRequest());

    function executeRequestAndPushData(request) {
      request.execute().then(function() {
        var requestData = [];

        Object.keys(request.results).forEach(function(key) {
          var timestamp = parseInt(key);
          var bugsCount = request.results[key].length;
          requestData.push([timestamp, bugsCount]);
        });

        $scope.data.push(requestData);
      });
    }

  });
