'use strict';

angular.module('b2gQaDashboardApp')
  .controller('FiledFixedCtrl', function ($scope, config, FiledSmoketestsBugsRequest, FixedSmoketestsBugsRequest) {

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

    $scope.sortedData = {};

    executeRequestAndPushData('Filed', new FiledSmoketestsBugsRequest());
    executeRequestAndPushData('Fixed', new FixedSmoketestsBugsRequest());

    function executeRequestAndPushData(keyName, request) {
      $scope.dataset.schema.push({ name: keyName });
      $scope.options.rows.push({ name: keyName, type: 'bar' });

      request.execute().then(function() {
        Object.keys(request.results).forEach(function(key) {
          var timestamp = parseInt(key);
          var bugsCount = request.results[key].length;
          var value = getExistingRecordIfItExists(timestamp);
          value[keyName] = bugsCount;

          if (typeof $scope.sortedData[timestamp] === 'undefined') {
              $scope.sortedData[timestamp] = {};
          }
          $scope.sortedData[timestamp][keyName] = request.results[key];
          $scope.dataset.records.push(value);
        });
      });
    }

    function getExistingRecordIfItExists(timestamp) {
      var record = { weekDay: new Date(timestamp) };
      $scope.dataset.records.some(function(element) {
        if (+(element.weekDay) === timestamp) {
          record = element;
          return true;
        }
        return false;
      });
      return record;
    }

  });
