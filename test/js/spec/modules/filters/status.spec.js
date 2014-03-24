define(
  [
    'backbone',
    'marionette',
    'conductor',
    'underscore',
    'q',
    'modules/filters/status/Module',
    'app',
    'collections/TodoList'
  ],
  function (Backbone, Marionette, Conductor, _, Q, Module, app, TodoList) {

    describe("Filter: Status Module", function(){
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

      describe("without any todo items", function(){

        beforeEach(function(done){
          app.Repositories = {
            Todos: function(){
              return {
                getAll: function(){
                  var defer = Q.defer();
                  var todoList = new TodoList();
                  defer.resolve(todoList);
                  return defer.promise;
                }
              }
            }
          }

          module.render(app.appRegion).done(function(){
            done();
          });
        });

        it("should not be visible", function(){
          var $el = app.appRegion.$el;
          expect($el.find('div')[0].style['display']).to.equal("none");
        });

      });

      describe("with todo items", function(){

        beforeEach(function(done){
          app.Repositories = {
            Todos: function(){
              return {
                getAll: function(){
                  var defer = Q.defer();
                  var todoList = new TodoList([
                    {
                      title: "1",
                      completed: true,
                      created: "2014-03-23T06:22:09.679Z",
                      _id: "1"
                    },
                    {
                      title: "2",
                      completed: false,
                      created: "2014-03-23T06:22:10.455Z",
                      _id: "2"
                    }
                  ]);
                  defer.resolve(todoList);
                  return defer.promise;
                }
              }
            }
          }

          module.render(app.appRegion).done(function(){
            done();
          });
        });

        afterEach(function(){
          app.vent.off();
        });

        it("should be visible", function(){
          var $el = app.appRegion.$el;
          expect($el.find('div')[0].style['display']).to.not.equal("none");
        });

        it("should have three filters", function(){
          var $el = app.appRegion.$el;
          var filters = $el.find('.filters a');
          expect(filters[0].outerHTML).to.equal('<a href="#">All</a>');
          expect(filters[1].outerHTML).to.equal('<a href="#active">Active</a>');
          expect(filters[2].outerHTML).to.equal('<a href="#completed">Completed</a>');
        });

        it("should send event when the 'all' filter is clicked", function(done){
          var $el = app.appRegion.$el;
          var filter = $el.find('li a')[0];

          // check for the correct event
          app.vent.on('todoList:filter', function(e){
            expect(e).to.equal('');
            done();
          });

          // click the filter
          var e = $.Event("click");
          $(filter).trigger(e);
        });

        it("should send event when the 'active' filter is clicked", function(done){
          var $el = app.appRegion.$el;
          var filter = $el.find('li a')[1];

          // check for the correct event
          app.vent.on('todoList:filter', function(e){
            expect(e).to.equal('active');
            done();
          });

          // click the filter
          var e = $.Event("click");
          $(filter).trigger(e);
        });

        it("should send event when the 'completed' filter is clicked", function(done){
          var $el = app.appRegion.$el;
          var filter = $el.find('li a')[2];

          // check for the correct event
          app.vent.on('todoList:filter', function(e){
            expect(e).to.equal('completed');
            done();
          });

          // click the filter
          var e = $.Event("click");
          $(filter).trigger(e);
        });



      });

    });
  }
);
