'use strict';

angular.module('services')
  .factory('FiltersCookies', function($cookieStore) {

    var ARRAY_SEPARATOR = ', ';
    var VERSION_FILTER = 'versionFilter';

    function FiltersCookies() {}

    FiltersCookies.getVersionFilters = function() {
      return getArray(VERSION_FILTER);
    };

    FiltersCookies.setVersionFilter = function(versionArray) {
      setArray(VERSION_FILTER, versionArray);
    };

    FiltersCookies.clearFilters = function() {
      $cookieStore.remove(VERSION_FILTER);
    };

    function getArray(cookieKey) {
      var string = $cookieStore.get(cookieKey);
      return stringToArray(string);
    }

    function setArray(cookieKey, array) {
      var string = arrayToString(array);
      $cookieStore.put(cookieKey, string);
    }

    function arrayToString(array) {
      return array.join(ARRAY_SEPARATOR);
    }

    function stringToArray(string) {
      return typeof string === 'undefined' || string === '' ? [] : string.split(ARRAY_SEPARATOR);
    }

    return FiltersCookies;
  });
