define(
  [
    'backbone',
    'marionette',
    'conductor',
    'underscore',
    'q',
    'modules/notepad/header/Module',
    'app'
  ],
  function (Backbone, Marionette, Conductor, _, Q, Module, app) {

    describe("Header Module", function(){
      "use strict";

      var module = null;

      beforeEach(function(){
        app.addRegions({
          appRegion: '#appRegion'
        });
        module = new Module();
      });

      afterEach(function(){
        module = null;
      });

      describe("creating a todo", function(){

        beforeEach(function(done){
          module.render(app.appRegion).done(function(){
            done();
          });
        });

        it("should display an input field", function(){
          var $el = app.appRegion.$el;
          var el = $el.find('input')[0];
          expect(el.outerHTML).to.equal('<input id="new-todo" placeholder="What needs to be done?" autofocus="">');
        });

        it("should should save the new todo and clear the input value when user presses enter", function(done){

          // enter a title for the todo
          var $input = app.appRegion.$el.find('input');
          $input.val('new todo');

          // set up the event handler
          app.commands.setHandler("todo:create", function(model){
            expect($input.val()).to.equal("");
            expect(model.get('title')).to.equal('new todo');
            done();
          });

          // press the enter key
          var e = $.Event("keypress");
          var ENTER_KEY = 13;
          e.which = ENTER_KEY;
          $input.trigger(e);
        });

      });

    });
  }
);
