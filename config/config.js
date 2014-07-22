'use strict';

angular.module('config', [])
  .constant('config',
    /* jshint -W109 */ // Avoid warning on double quotes usage (as we're providing a JSON object)
    @@configJson
    /* jshint +W109 */
  );
