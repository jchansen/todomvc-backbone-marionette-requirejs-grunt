/*global define */

define(
  [
    'marionette',
    'underscore',
    'app',
    'q',

    'modules/banner/Module',
    'modules/notepad/Module',
    'modules/filters/Module',
    'modules/info/Module'
  ],
  function (Marionette, _, app, Q, BannerModule, NotepadModule, FiltersModule, InfoModule) {
    'use strict';

    var Router = Marionette.AppRouter.extend({
      appRoutes: {
        '*filter': 'showContent'
      }
    });

    var Controller = function () {
      // put variables here
    };

    _.extend(Controller.prototype, {

      initialize: function () {
        var that = this;
        app.vent.on('todoList:filter', function(filter){
          that.router.navigate("#" + filter);
        });
      },

      showContent: function (param) {
        var self = this;
        Q.all([
            (new BannerModule()).render(app.banner),
            (new NotepadModule()).render(app.notepad),
            (new FiltersModule()).render(app.filters),
            (new InfoModule()).render(app.info)
          ]).done(function () {
            self.setFilter(param);
            self.setSortingFilter('date');
          });
      },

      setFilter: function (param) {
        app.vent.trigger('todoList:filter', param && param.trim() || '');
      },

      setSortingFilter: function (param) {
        app.vent.trigger('todoList:sort', param && param.trim() || 'date');
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
