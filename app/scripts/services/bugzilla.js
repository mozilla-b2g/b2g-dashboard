'use strict';

angular.module('services')
  .factory('bugzilla', function () {

    var bugzilla = {};

    bugzilla.open = function (bugsIds) {
      window.open('https://bugzilla.mozilla.org/buglist.cgi?bug_id=' + bugsIds.join('%2C'));
    };

    return bugzilla;

  });
