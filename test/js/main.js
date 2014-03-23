(function () {
  var root = this;

  require.config({
    baseUrl: './js',
    paths: {
      jquery: '../../public/bower_components/jquery/jquery',
      underscore: '../../public/bower_components/underscore/underscore',
      backbone: '../../public/bower_components/backbone/backbone',
      marionette: '../../public/bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
      'backbone.wreqr': '../../public/bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
      'backbone.babysitter': '../../public/bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
      conductor: '../../public/app/lib/conductor',
      tpl: '../../public/app/lib/tpl',
      localStorage: '../js/lib/backbone.localStorage',
      q: '../../public/bower_components/q/q',
      modules: '../../public/app/modules',
      app: '../../public/app/app',
      models: '../../public/app/models',
      collections: '../../public/app/collections',
      context: '../../public/app/context',
      logger: '../../public/app/logger',
      toastr: '../../public/javascripts/toastr'
    },
    shim: {
      underscore: {
        deps: [],
        exports: '_'
      },
      backbone: {
        deps: ['jquery', 'underscore'],
        exports: 'Backbone'
      },
      marionette: {
        deps: ['backbone'],
        exports: 'Marionette'
      },
      conductor: {
        deps: ['underscore', 'backbone', 'marionette', 'q'],
        exports: 'Conductor'
      }
    }

  });

  setupMochaAndBoot();

  function setupMochaAndBoot() {

    // Chai
    var expect = chai.expect;
    window.expect = expect;
    mocha.setup('bdd');

    requirejs([], boot);
  }

  function boot() {
    require(['SpecRunner'], function (bs) {
      (window.mochaPhantomJS || mocha).run();
    });
  }

})();