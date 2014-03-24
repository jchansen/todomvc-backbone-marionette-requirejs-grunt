define(
  [
    'backbone',
    'marionette',
    'conductor',
    'underscore',
    'q',
    'modules/notepad/list/Module',
    'app',
    'collections/TodoList',
    'collections/FilteredCollection'
  ],
  function (Backbone, Marionette, Conductor, _, Q, Module, app, TodoList, FilteredCollection) {

    describe("List Module", function(){
      "use strict";

      var module = null;

      function resetRepositories(done){
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
                var filteredCollection = new FilteredCollection(null, {cache: todoList});
                defer.resolve(filteredCollection);
                return defer.promise;
              }
            }
          }
        }
      }

      beforeEach(function(done){
        app.addRegions({
          appRegion: '#appRegion'
        });
        module = new Module();
        module.render(app.appRegion).done(function(){
          done();
        });
      });

      afterEach(function(){
        module = null;
        resetRepositories();
        app.commands.off();
        app.vent.off();
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

        it("should be visible", function(){
          var $el = app.appRegion.$el;
          expect($el.find('div')[0].style['display']).to.not.equal("none");
        });

        describe("when filtered by all", function(){

          beforeEach(function(){
            app.vent.trigger('todoList:filter','');
          });

          it("should display all items", function(){
            var $el = app.appRegion.$el;
            var todos = $el.find('li');
            var numberOfTodos = todos.length;
            expect(numberOfTodos).to.equal(2);
          });

        });

        describe("when filtered by active", function(){

          beforeEach(function(){
            app.vent.trigger('todoList:filter','active');
          });

          it("should display only active items", function(){
            var $el = app.appRegion.$el;
            var todos = $el.find('li');
            var numberOfTodos = todos.length;
            expect(numberOfTodos).to.equal(1);
          });

          it("items should be unchecked", function(){
            var $el = app.appRegion.$el;
            var todos = $el.find('li');
            expect(todos.find('input')[0].checked).to.be.false;
          });

          it("remove item from list when checked", function(){
            var $el = app.appRegion.$el;
            var todo = $el.find('li input')[0];

            var e = $.Event("click");
            $(todo).trigger(e);

            var todos = $el.find('li');
            var numberOfTodos = todos.length;
            expect(numberOfTodos).to.equal(0);
          });

        });

        describe("when filtered by completed", function(){

          beforeEach(function(){
            app.vent.trigger('todoList:filter','completed');
          });

          it("should display only completed items", function(){
            var $el = app.appRegion.$el;
            var todos = $el.find('li');
            var numberOfTodos = todos.length;
            expect(numberOfTodos).to.equal(1);
          });

          it("items should be checked", function(){
            var $el = app.appRegion.$el;
            var todos = $el.find('li');
            expect(todos.find('input')[0].checked).to.be.true;
          });

          it("remove item from list when unchecked", function(){
            var $el = app.appRegion.$el;
            var todo = $el.find('li input')[0];

            var e = $.Event("click");
            $(todo).trigger(e);

            var todos = $el.find('li');
            var numberOfTodos = todos.length;
            expect(numberOfTodos).to.equal(0);
          });

        });

        describe("editing an item", function(){

          beforeEach(function(done){
            module.render(app.appRegion).done(function(){
              done();
            });
            app.vent.trigger('todoList:filter','');
          });

          it("should change to edit mode on double click", function(){
            var $el = app.appRegion.$el;
            var todo = $el.find('li')[0];
            var todoLabel = $(todo).find('label');

            var e = $.Event("dblclick");
            $(todoLabel).trigger(e);

            expect($(todo).hasClass("editing")).to.be.true;
          });

          it("delete item if title removed", function(done){
            var $el = app.appRegion.$el;
            var todo = $el.find('li')[0];
            var input = $(todo).find('input.edit');
            input.val("");

            app.commands.setHandler("todo:delete", function(model){
              expect(model.get('title')).to.equal('1');
              done();
            });

            var e = $.Event("blur");
            $(input).trigger(e);
          });

          it("update item if title changed", function(done){
            var $el = app.appRegion.$el;
            var todo = $el.find('li')[0];
            var input = $(todo).find('input.edit');
            input.val("new value");

            app.commands.setHandler("todo:update", function(model){
              expect(model.get('title')).to.equal('new value');
              done();
            });

            var e = $.Event("blur");
            $(input).trigger(e);
          });
        });

      });

    });
  }
);
