define(
  [
    'backbone',
    'marionette',
    'conductor',
    'underscore',
    'q',
    'modules/info/Module'
  ],
  function (Backbone, Marionette, Conductor, _, Q, Module) {

    describe("Info Module", function(){
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

      it("should display credits", function(done){
        module.render(app.appRegion).done(function(){
          var $el = app.appRegion.$el;
          expect($el.find('a').html()).to.equal('Jason Hansen');
          expect($el.find('a').attr('href')).to.equal('http://github.com/jchansen');
          done();
        });
      });

    });
  }
);
