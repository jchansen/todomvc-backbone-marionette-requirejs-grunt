define(
  [
    'backbone',
    'marionette',
    'conductor',
    'underscore',
    'q',
    'modules/filters/paging/Module',
    'modules/filters/paging/Paging',
    'app',
    'collections/TodoList',
    'collections/FilteredCollectionDecorator',
    'collections/PagedCollectionDecorator'
  ],
  function (Backbone, Marionette, Conductor, _, Q, Module, View, app, TodoList, FilteredCollectionDecorator, PagedCollectionDecorator) {

    describe("Filter: Paging", function(){
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

          var view = null;
          beforeEach(function(){
            var todoList = new TodoList();
            var filteredList = new FilteredCollectionDecorator(null, {collection: todoList});
            var pagedList = new PagedCollectionDecorator(null, {collection: filteredList});
            view = new View({collection: pagedList});
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
              collection: filteredList,
              pagingConfig: {
                resultsPerPage: 4
              }
            });
            view = new View({collection: pagedList});
            app.appRegion.show(view);
          });

          it("should be visible", function(){
            var $el = app.appRegion.$el;
            expect($el.find('div')[0].style['display']).to.not.equal("none");
          });

          it("should have three pages", function(){
            var $el = app.appRegion.$el;
            var filters = $el.find('.filters a');
            expect(filters.length).to.equal(3);
            expect(filters[0].outerHTML).to.equal('<a href="#page1" class="selected">1</a>');
            expect(filters[1].outerHTML).to.equal('<a href="#page2">2</a>');
            expect(filters[2].outerHTML).to.equal('<a href="#page3">3</a>');
          });

          describe("first page", function(){

            beforeEach(function(){
              pagedList.updateConfiguration({
                pagingConfig: {
                  currentPage: 1
                }
              });
            });

            it("should not show the previous page button on first page", function(){
              var $el = app.appRegion.$el;
              var previousPageButton = $el.find('.filter-content-left')[0];
              expect(previousPageButton.style['display']).to.equal("none");
            });

            it("should show the next page button on first page", function(){
              var $el = app.appRegion.$el;
              var nextPageButton = $el.find('.filter-content-right')[0];
              expect(nextPageButton.style['display']).to.not.equal("none");
            });

            it("should have the first page link selected", function(){
              var $el = app.appRegion.$el;
              var page = $el.find('.filters a')[0];
              expect(page.outerHTML).to.equal('<a href="#page1" class="selected">1</a>');
            });
          });

          describe("second page", function(){

            beforeEach(function(){
              pagedList.updateConfiguration({
                pagingConfig: {
                  currentPage: 2
                }
              });
            });

            it("should show the previous page button on second page", function(){
              var $el = app.appRegion.$el;
              var previousPageButton = $el.find('.filter-content-left')[0];
              expect(previousPageButton.style['display']).to.not.equal("none");
            });

            it("should show the next page button on second page", function(){
              var $el = app.appRegion.$el;
              var nextPageButton = $el.find('.filter-content-right')[0];
              expect(nextPageButton.style['display']).to.not.equal("none");
            });

            it("should have the second page link selected", function(){
              var $el = app.appRegion.$el;
              var page = $el.find('.filters a')[1];
              expect(page.outerHTML).to.equal('<a href="#page2" class="selected">2</a>');
            });
          });

          describe("last page", function(){

            beforeEach(function(){
              pagedList.updateConfiguration({
                pagingConfig: {
                  currentPage: 3
                }
              });
            });

            it("should show the previous page button on last page", function(){
              var $el = app.appRegion.$el;
              var previousPageButton = $el.find('.filter-content-left')[0];
              expect(previousPageButton.style['display']).to.not.equal("none");
            });

            it("should not show the next page button on last page", function(){
              var $el = app.appRegion.$el;
              var nextPageButton = $el.find('.filter-content-right')[0];
              expect(nextPageButton.style['display']).to.equal("none");
            });

            it("should have the third page link selected", function(){
              var $el = app.appRegion.$el;
              var page = $el.find('.filters a')[2];
              expect(page.outerHTML).to.equal('<a href="#page3" class="selected">3</a>');
            });

          });

        });

      });

    });
  }
);
