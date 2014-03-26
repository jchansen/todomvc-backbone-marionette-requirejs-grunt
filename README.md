# About TodoMVC++

A sandbox for a more complex version of the standard TodoMVC project.

[ ![Codeship Status for jchansen/todomvc-backbone-marionette-requirejs-grunt](https://www.codeship.io/projects/8874a0a0-9072-0131-5aa2-067285c9696d/status?branch=master)](https://www.codeship.io/projects/16304)

# Project Notes

## Deploy Process

The project uses CodeShip to deploy to Heroku when commits are made to master.

## Heroku Configuration

The project uses r.js to compile and minify the project code, and executes the process using a grunt task.  I'm using a
Heroku buildpack so that 'grunt heroku' gets run after every push, which in turn kicks off r.js.

heroku config:add BUILDPACK_URL=https://github.com/stephanmelzer/heroku-buildpack-nodejs-grunt-compass.git

It also uses bower to download JavaScript dependencies.  For that, I added a postinstall step in the package.json to run
'bower install'.  This occurs before 'grunt heroku' is run.

I'm using SCSS for the CSS preprocessor.  This requires Ruby to be installed on the server.  The buildpack also make
sure Ruby is available run the preprocessor.

Need to set an environment variable to signal the Node server to run the production code served out of public_compiled.
heroku config:add NODE_ENV=production
