(function (root, factory) {
  if (typeof exports === 'object') {

    var underscore = require('underscore');
    var backbone = require('backbone');
    var marionette = require('marionette');
    var q = require('q');

    module.exports = factory(underscore, backbone, marionette, q);

  } else if (typeof define === 'function' && define.amd) {

    define(['underscore', 'backbone', 'marionette', 'q'], factory);

  }
}(this, function (_, Backbone, Marionette, Q) {

  var Conductor = (function (global, _, Backbone, Marionette, Q) {
    "use strict";

    // Initial Setup
    // -------------

    // Define and export the Conductor namespace
    var Conductor = {};
    Marionette.Conductor = Conductor;

    // Helpers
    // -------

    function throwError(message, name) {
      var error = new Error(message);
      error.name = name || 'Error';
      throw error;
    }

    // Conductor.extend
    // -----------------

    // Borrow the Backbone `extend` method so we can use it as needed
    Conductor.extend = Marionette.extend;

    // Module
    // ------

    // A simple module system, used to create privacy and encapsulation in
    // Conductor applications
    var Module = Conductor.Module = function (options) {
      // create a unique ID for the module.
      this.cid = _.uniqueId('module');
      this._configure(options || {});
      this.initialize.apply(this, arguments);
    };

    var moduleOptions = ['view', 'submodules', 'data', 'loadingView'];

    _.extend(Module.prototype, {

      // Override with custom initialization
      initialize: function () {
      },

      // Attach moduleOptions to module if specified
      _configure: function (options) {
        if (this.options) options = _.extend({}, _.result(this, 'options'), options);
        _.extend(this, _.pick(options, moduleOptions));
        this.options = options;
        _.bindAll(this, "render");
      },

      render: function (region) {
        var defer = Q.defer();

        if (this.loadingView) {
          var loadingView = new this.loadingView();
          region.show(loadingView);
        }

        this.renderModule(region).then(function (view) {
          defer.resolve(view);
        }).done();
        return defer.promise;
      },

      // this method should be overridden by whatever class extends it
      renderModule: function (region) {
        throwError("module is abstract");
      },

      // Common render functions
      // -----------------------

      _renderView: function (region) {
        var defer = Q.defer();
        var promises = [];
        var keys = [];

        for (var key in this.data) {
          promises.push(this.data[key]());
          keys.push(key);
        }

        var that = this;
        Q.all(promises).done(function (result) {
          var newOptions = {};
          for (var i in keys) {
            newOptions[keys[i]] = result[i];
          }
          var view = new that.view(_.extend(newOptions, that.options));
          region.show(view);
          defer.resolve(view);
        });

        return defer.promise;
      }

    });

    // Set up inheritance for child modules
    Conductor.Module.extend = Conductor.extend;

    // Layout Module
    // -------------
    Conductor.LayoutModule = Conductor.Module.extend({

      _renderSubmodules: function (layout, defer) {
        var promises = [];

        _.each(this.submodules, function (submodule) {
          var module = new submodule["module"]();
          var regionName = submodule["region"];
          var region = layout[regionName];
          var promise = module.render(region);
          promises.push(promise);
        });

        // Resolves after all the modules are inserted into the layout
        Q.all(promises).done(function () {
          defer.resolve(layout);
        });
      },

      renderModule: function (region) {
        var defer = Q.defer();
        var self = this;
        this._renderView(region).done(function (layout) {
          self._renderSubmodules(layout, defer);
        });
        return defer.promise;
      }

    });

    // ItemView Module
    // ---------------
    Conductor.ItemViewModule = Conductor.Module.extend({

      renderModule: function (region) {
        return this._renderView(region);
      }

    });

    // CollectionView Module
    // ---------------------
    Conductor.CollectionViewModule = Conductor.Module.extend({

    });

    // CompositeView Module
    // --------------------
    Conductor.CompositeViewModule = Conductor.Module.extend({

      // currently identical to ItemViewModule.renderModule
      renderModule: function (region) {
        return this._renderView(region);
      }

    });

    // Set up inheritance for all modules types
    Conductor.LayoutModule.extend = Conductor.extend;
    Conductor.ItemViewModule.extend = Conductor.extend;
    Conductor.CollectionViewModule.extend = Conductor.extend;
    Conductor.CompositeViewModule.extend = Conductor.extend;

    return Conductor;
  })(this, _, Backbone, Marionette, Q)

  return Conductor;
}));
