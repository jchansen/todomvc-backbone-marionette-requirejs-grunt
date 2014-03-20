/*global define */

define(
  [
    'marionette',
    'underscore',
    'app'
  ],
  function (Marionette, _, app) {
    'use strict';

    var Router = Marionette.AppRouter.extend({
      appRoutes: {
        '*filter': 'setFilter'
      }
    });

    var Controller = function () {
      // put variables here
    };

    _.extend(Controller.prototype, {

      initialize: function () {},

      setFilter: function (param) {
        app.vent.trigger('todoList:filter', param && param.trim() || '');
      }

    });

    app.addInitializer(function () {
      var controller = new Controller();
      controller.initialize();
      controller.router = new Router({
        controller: controller
      });
    });

  });
