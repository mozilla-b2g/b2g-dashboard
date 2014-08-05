'use strict';

angular.module('services').factory('SmoketestsAgeBugsRequest', function(SmoketestsBugsRequest, IntervalsArray, ONE_WEEK,
                                                                        AGE_RANGES) {
  function SmoketestsAgeBugsRequest() {
    SmoketestsBugsRequest.apply(this, arguments);
    return this;
  }

  SmoketestsAgeBugsRequest.prototype = new SmoketestsBugsRequest();


  SmoketestsAgeBugsRequest.prototype.execute = function() {
    var self = this;
    var parentExecute = SmoketestsBugsRequest.prototype.execute.apply(this, arguments);

    return parentExecute.then(function(response) {
      var results = {};
      var firstBug = self.results[0];
      var firstBugDate = new Date(firstBug.created_ts);

      // Get the first day of the week where the first bug has been filed
      var currentWeek = firstBugDate.getDate() - firstBugDate.getDay();
      currentWeek = firstBugDate.setDate(currentWeek);

      var today = Date.now();
      while (currentWeek <= today) {
        results[currentWeek] = generateWeekResults(currentWeek);
        currentWeek += ONE_WEEK;
      }

      self.results = results;

      return response;
    });

    function generateWeekResults(firstDayOfTheWeek) {
      var weekResults = new IntervalsArray(AGE_RANGES);

      for(var i = 0; i < self.results.length; i++) {
        var bug = self.results[i];
        var lastWeek = firstDayOfTheWeek - ONE_WEEK;

        if (bug.hasBeenCreatedSince(firstDayOfTheWeek)  // Get rid of the bugs that are not created yet
            && !bug.hasBeenResolvedSince(lastWeek)) {   // Get rid of the bugs that are already been resolved and counted

          var age = bug.getAgeInDaysAt(firstDayOfTheWeek);
          weekResults.addContent(age, bug);
        }
      }
      return weekResults;
    }
  };

  return SmoketestsAgeBugsRequest;
});
