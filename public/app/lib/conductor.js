(function () {
  "use strict";

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `exports`
  // on the server).
  var root = this;

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

  var moduleOptions = ['view', 'submodules'];

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
    }

  });

  // Set up inheritance for child modules
  Conductor.Module.extend = Conductor.extend;

  // Layout Module
  // -------------
  Conductor.LayoutModule = Conductor.Module.extend({

  });

  // ItemView Module
  // ---------------
  Conductor.ItemViewModule = Conductor.Module.extend({

    renderModule: function(region) {
      var defer = Q.defer();

      var view = new this.view(this.options);
      region.show(view);
      defer.resolve(view);

      return defer.promise;
    }

  });

  // CollectionView Module
  // ---------------------
  Conductor.CollectionViewModule = Conductor.Module.extend({

  });

  // CompositeView Module
  // --------------------
  Conductor.CompositeViewModule = Conductor.Module.extend({

  });

  // Set up inheritance for all modules types
  Conductor.LayoutModule.extend = Conductor.extend;
  Conductor.ItemViewModule.extend = Conductor.extend;
  Conductor.CollectionViewModule.extend = Conductor.extend;
  Conductor.CompositeViewModule.extend = Conductor.extend;

  return Conductor;

}).call(this);


