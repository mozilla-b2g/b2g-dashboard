'use strict';

angular.module('b2gQaDashboardApp')
  .controller('SmoketestAgeCtrl', function ($scope, config, SmoketestsAgeBugsRequest) {

    $scope.dataset = {
      schema: [{
        name: 'weekDay',
        type: 'datetime',
        format: ' '
      }],
      records: []
    };

    $scope.options = {
      rows: [],
      xAxis: {
        name: 'weekDay',
        displayFormat: '%Y-%m-%d'
      },
      subchart: {
        show: true
      }
    };

    executeRequestAndPushData(new SmoketestsAgeBugsRequest());

    function executeRequestAndPushData(request) {
      request.execute().then(function() {
        var firstIntervalArray = request.results[Object.keys(request.results)[0]];
        $scope.options.rows = generateRows(firstIntervalArray);

        Object.keys(request.results).forEach(function(key) {
          var timestamp = parseInt(key);
          var value = { weekDay: new Date(timestamp) };
          var intervalsArray = request.results[key];

          for(var i = 0; i < intervalsArray.intervalsContent.length; i++) {
            value[intervalsArray.endPointsToString(i)] = intervalsArray.intervalsContent[i].length;
          }

          $scope.dataset.records.push(value);
        });
      });
    }

    function generateRows(intervalsArray) {
      var array = [];
      for(var i = 0; i < intervalsArray.endPoints.length; i++) {
        array.push({ name: intervalsArray.endPointsToString(i), type: 'bar' });
      }
      return array;
    }
  });
