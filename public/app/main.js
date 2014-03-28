require.config({
  baseUrl: '/app',
  paths: {
    underscore: '../bower_components/underscore/underscore',
    backbone: '../bower_components/backbone/backbone',
    marionette: '../bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
    'backbone.wreqr': '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
    'backbone.babysitter': '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
    conductor: 'lib/conductor',
    jquery: '../bower_components/jquery/jquery',
    localStorage: '../bower_components/backbone.localStorage/backbone.localStorage',
    q: '../bower_components/q/q',
    tpl: 'lib/tpl',
    text: 'lib/text',
    toastr: '../javascripts/toastr',
    spin: '../javascripts/spin',
    'socket.io': '../javascripts/socket.io'
  },

  shim: {
    underscore: {
      deps: [],
      exports: '_'
    },

    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },

    marionette: {
      deps: ['backbone'],
      exports: 'Marionette'
    },

    'conductor': {
      deps: ['underscore', 'backbone', 'marionette', 'q'],
      exports: 'Conductor'
    }

  }
});

require(
  [
    'bootstrapper'
  ],
  function (bootstrapper) {
    'use strict';

    bootstrapper.run();
  });


