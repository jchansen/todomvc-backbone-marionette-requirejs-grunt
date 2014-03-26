define(
  [
    'backbone',
    'marionette',
    'conductor',
    'underscore',
    'q',
    'modules/filters/sorting/Module',
    'modules/filters/sorting/View',
    'app',
    'collections/TodoList',
    'collections/SortedCollectionDecorator'
  ],
  function (Backbone, Marionette, Conductor, _, Q, Module, View, app, TodoList, SortedCollectionDecorator) {

    describe("Filter: Sorting", function(){
      "use strict";

      beforeEach(function(){
        app.addRegions({
          appRegion: '#appRegion'
        });
        app.reqres.off();
        app.commands.off();
        app.vent.off();
      });

      describe("module", function(){

        beforeEach(function(){
          var todoList = new TodoList();
          var sortedList = new SortedCollectionDecorator(null, {collection: todoList});
          app.reqres.setHandler("todoList:paged", function(){
            var defer = Q.defer();
            defer.resolve(sortedList);
            return defer.promise;
          });
        });

        it("should instantiate view without error", function(done){
          var module = new Module();
          module.render(app.appRegion).done(function(){
            done();
          });
        });
      });

      describe("view", function(){

        describe("without any todo items", function(){

          beforeEach(function(){
            var todoList = new TodoList();
            var sortedList = new SortedCollectionDecorator(null, {collection: todoList});
            var view = new View({collection: sortedList});
            app.appRegion.show(view);
          });

          it("should not be visible", function(){
            var $el = app.appRegion.$el;
            expect($el.find('div')[0].style['display']).to.equal("none");
          });

        });

        describe("with todo items", function(){

          var view = null;
          var sortedList = null;
          beforeEach(function(){
            var models = [{
              title: "1",
              completed: true,
              created: "2014-03-23T06:22:09.679Z",
              _id: "1"
            },{
              title: "2",
              completed: false,
              created: "2014-03-23T06:22:10.455Z",
              _id: "2"
            }];
            var todoList = new TodoList(models);
            sortedList = new SortedCollectionDecorator(null, {
              collection: todoList
            });
            view = new View({collection: sortedList});
            app.appRegion.show(view);
          });

          it("should be visible", function(){
            var $el = app.appRegion.$el;
            expect($el.find('div')[0].style['display']).to.not.equal("none");
          });

          it("should have three filters", function(){
            var $el = app.appRegion.$el;
            var filters = $el.find('.filters a');
            expect(filters[0].outerHTML).to.equal('<a href="#date">Date Created</a>');
            expect(filters[1].outerHTML).to.equal('<a href="#title">Title</a>');
            expect(filters[2].outerHTML).to.equal('<a href="#completed">Completed</a>');
          });

          it("should send event when the 'Date Created' filter is clicked", function(done){
            var $el = app.appRegion.$el;
            var filter = $el.find('li a')[0];

            // check for the correct event
            app.vent.on('todoList:sort', function(e){
              expect(e).to.equal('date');
              done();
            });

            // click the filter
            var e = $.Event("click");
            $(filter).trigger(e);
          });

          it("should send event when the 'Title' filter is clicked", function(done){
            var $el = app.appRegion.$el;
            var filter = $el.find('li a')[1];

            // check for the correct event
            app.vent.on('todoList:sort', function(e){
              expect(e).to.equal('title');
              done();
            });

            // click the filter
            var e = $.Event("click");
            $(filter).trigger(e);
          });

          it("should send event when the 'Completed' filter is clicked", function(done){
            var $el = app.appRegion.$el;
            var filter = $el.find('li a')[2];

            // check for the correct event
            app.vent.on('todoList:sort', function(e){
              expect(e).to.equal('completed');
              done();
            });

            // click the filter
            var e = $.Event("click");
            $(filter).trigger(e);
          });

        });

      });
    });
  }
);
