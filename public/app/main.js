require.config({
  baseUrl: '/app',
  paths: {
    underscore: '../bower_components/underscore/underscore',
    backbone: '../bower_components/backbone/backbone',
    marionette: '../bower_components/backbone.marionette/lib/backbone.marionette',
    conductor: 'lib/conductor',
    jquery: '../bower_components/jquery/jquery',
    localStorage: '../bower_components/backbone.localStorage/backbone.localStorage',
    q: '../bower_components/q/q',
    tpl: 'lib/tpl',
    text: 'lib/text'
  },

  shim: {
    underscore: {
      exports: '_'
    },

    backbone: {
      exports: 'Backbone',
      deps: ['jquery', 'underscore']
    },

    marionette: {
      exports: 'Backbone.Marionette',
      deps: ['backbone']
    },

    'conductor': {
      deps: ['underscore', 'backbone', 'marionette', 'q'],
      exports: 'Conductor'
    }
  },

  deps: ['jquery', 'underscore']
});

require(
  [
    'bootstrapper'
  ],
  function (bootstrapper) {
    'use strict';

    bootstrapper.run();
  });
