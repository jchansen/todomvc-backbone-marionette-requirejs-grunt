define(
  [
    'backbone',
    'marionette',
    'conductor',
    'underscore',
    'q',
    'modules/filters/status/Module',
    'modules/filters/status/Status',
    'app',
    'collections/TodoList',
    'collections/FilteredCollectionDecorator',
    'collections/PagedCollectionDecorator'
  ],
  function (Backbone, Marionette, Conductor, _, Q, Module, View, app, TodoList, FilteredCollectionDecorator, PagedCollectionDecorator) {

    describe("Filter: Status", function(){
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
          var filteredList = new FilteredCollectionDecorator(null, {collection: todoList});
          var pagedList = new PagedCollectionDecorator(null, {collection: filteredList});
          app.reqres.setHandler("todoList", function(){
            var defer = Q.defer();
            defer.resolve(todoList);
            return defer.promise;
          });
          app.reqres.setHandler("todoList:paged", function(){
            var defer = Q.defer();
            defer.resolve(pagedList);
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
            var filteredList = new FilteredCollectionDecorator(null, {collection: todoList});
            var pagedList = new PagedCollectionDecorator(null, {collection: filteredList});
            var view = new View({collection: todoList, pagedCollection: pagedList});
            app.appRegion.show(view);
          });

          it("should not be visible", function(){
            var $el = app.appRegion.$el;
            expect($el.find('div')[0].style['display']).to.equal("none");
          });

        });

        describe("with todo items", function(){

          var view = null;
          var pagedList = null;
          beforeEach(function(){
            var models = [];
            for(var i = 1; i <= 12; i++){
              models.push({id: i});
            }
            var todoList = new TodoList(models);
            var filteredList = new FilteredCollectionDecorator(null, {collection: todoList});
            pagedList = new PagedCollectionDecorator(null, {
              collection: filteredList
            });
            view = new View({collection: todoList, filteredCollection: pagedList});
            app.appRegion.show(view);
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

          describe("when a single item is active", function(){

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
              var filteredList = new FilteredCollectionDecorator(null, {collection: todoList});
              pagedList = new PagedCollectionDecorator(null, {
                collection: filteredList
              });
              view = new View({collection: todoList, filteredCollection: pagedList});
              app.appRegion.show(view);
            });

            it("should display the item count with proper pluralization", function(){
              var $el = app.appRegion.$el;
              var todoCount = $el.find('.todo-count')[0];
              expect(todoCount.innerHTML).to.equal('<strong>1</strong> item left')
            });

          });

          describe("when multiple items are active", function(){

            beforeEach(function(){
              var models = [{
                title: "1",
                completed: false,
                created: "2014-03-23T06:22:09.679Z",
                _id: "1"
              },{
                title: "2",
                completed: false,
                created: "2014-03-23T06:22:10.455Z",
                _id: "2"
              }];
              var todoList = new TodoList(models);
              var filteredList = new FilteredCollectionDecorator(null, {collection: todoList});
              pagedList = new PagedCollectionDecorator(null, {
                collection: filteredList
              });
              view = new View({collection: todoList, filteredCollection: pagedList});
              app.appRegion.show(view);
            });

            it("should display the item count with proper pluralization", function(){
              var $el = app.appRegion.$el;
              var todoCount = $el.find('.todo-count')[0];
              expect(todoCount.innerHTML).to.equal('<strong>2</strong> items left')
            });

          });

        });

      });
    });
  }
);
