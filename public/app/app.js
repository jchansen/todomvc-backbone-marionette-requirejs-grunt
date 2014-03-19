/*global define */

define(
  [
    'marionette',
    'context/Repositories'
  ],
  function (Marionette, Repositories) {
    'use strict';

    var app = new Marionette.Application();
    window.app = app;

    app.addRegions({
      header: '#header',
      main: '#mainRegion',
      footer: '#footer'
    });

    app.on("initialize:before", function () {
      app.Repositories = new Repositories();
    });

    app.on("initialize:after", function () {
      Backbone.history.start();
    });

    return app;
  });
