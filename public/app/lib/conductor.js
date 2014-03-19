(function () {
  "use strict";

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `exports`
  // on the server).
  var root = this;

  // Require Underscore if it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) {
    _ = require('underscore');
  }

  // Require Backbone if it's not already present.
  var Backbone = root.Backbone;
  if (!Backbone && (typeof require !== 'undefined')) {
    Backbone = require('backbone');
  }

  // Require Backbone.Marionette if it's not already present
  var Marionette = root.Marionette;
  if (!Marionette && (typeof require !== 'undefined')) {
    Marionette = require('backbone.marionette');
  }

  // Require Q if it's not already present (used for promises)
  var Q = root.Q;
  if (!Q && (typeof require !== 'undefined')) {
    Q = require('q');
  }

  // Define and export the Conductor namespace
  var Conductor = {};
  root.Conductor = Marionette.Conductor = Conductor;

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

  var moduleOptions = ['view', 'submodules', 'data'];

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

    _renderView: function(region){
      var defer = Q.defer();
      var promises = [];
      var keys = [];

      for(var key in this.data){
        promises.push(this.data[key]());
        keys.push(key);
      }

      var that = this;
      Q.all(promises).done(function(result){
        var newOptions = {};
        for(var i in keys){
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

    _renderSubmodules: function(layout, defer) {
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

    renderModule: function(region) {
      var defer = Q.defer();
      var self = this;
      this._renderView(region).done(function(layout){
        self._renderSubmodules(layout, defer);
      });
      return defer.promise;
    }

  });

  // ItemView Module
  // ---------------
  Conductor.ItemViewModule = Conductor.Module.extend({

    renderModule: function(region) {
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
    renderModule: function(region) {
      return this._renderView(region);
    }

  });

  // Set up inheritance for all modules types
  Conductor.LayoutModule.extend = Conductor.extend;
  Conductor.ItemViewModule.extend = Conductor.extend;
  Conductor.CollectionViewModule.extend = Conductor.extend;
  Conductor.CompositeViewModule.extend = Conductor.extend;

  return Conductor;

}).call(this);


