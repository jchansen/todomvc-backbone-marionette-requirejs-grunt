define(
  [
    'backbone',
    'marionette',
    'conductor',
    'underscore',
    'q',
    'modules/banner/Module'
  ],
  function (Backbone, Marionette, Conductor, _, Q, Module) {

    describe("Banner Module", function(){
      "use strict";

      var app = null;
      var module = null;

      beforeEach(function(){
        app = new Marionette.Application();
        app.addRegions({
          appRegion: '#appRegion'
        });
        app.start();

        module = new Module();
      });

      afterEach(function(){
        app = null;
        module = null;
      });

      it("should display title", function(done){
        module.render(app.appRegion).done(function(){
          var $el = app.appRegion.$el;
          expect($el.find('h1').html()).to.equal("todos");
          done();
        });
      });

    });
  }
);
