# B2G Dashboard [![Build Status](https://travis-ci.org/mozilla-b2g/b2g-dashboard.png?branch=master)](https://travis-ci.org/mozilla-b2g/b2g-dashboard)
This dashboard is developed to track bugs from smoketests in [Firefox OS](https://www.mozilla.org/en-US/firefox/os/).
Here you can find a [live instance](http://mozilla-b2g.github.io/b2g-dashboard).

## Run it locally
1. Install [Node.js + npm](http://nodejs.org/), [Bower](http://bower.io/), [grunt-cli](http://gruntjs.com/getting-started), [Compass](http://compass-style.org/install/)
1. Clone the project
1. cd into it
1. `npm install`
1. `bower install`
1. `grunt serve`
1. If you don't have a copy of [Bugzilla ES cluster](https://wiki.mozilla.org/BMO/ElasticSearch): `grunt replace:production`
