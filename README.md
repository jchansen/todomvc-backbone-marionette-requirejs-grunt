Using buildpack on heroku.  Still need to include a postinstall step for running bower install though.

heroku config:add NODE_ENV=production

heroku config:add BUILDPACK_URL=https://github.com/stephanmelzer/heroku-buildpack-nodejs-grunt-compass.git


[ ![Codeship Status for jchansen/todomvc-backbone-marionette-requirejs-grunt](https://www.codeship.io/projects/bc000f00-7255-0131-a062-7e2610a9ea18/status?branch=master)](https://www.codeship.io/projects/13637)