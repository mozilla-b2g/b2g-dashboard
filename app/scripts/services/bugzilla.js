'use strict';

angular.module('services')
  .factory('bugzilla', function (config) {

    var bugzilla = {};

    bugzilla.open = function (bugsIds) {
      var endUrl = bugsIds.length === 1 ? 'show_bug.cgi?id=' : 'buglist.cgi?bug_id=';
      window.open(config.bugtracker.host + endUrl + bugsIds.join('%2C'));
    };

    return bugzilla;

  });
