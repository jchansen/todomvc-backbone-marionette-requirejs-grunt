define(
  [
    'backbone',
    'collections/FilteredCollectionDecorator',
    'collections/PagedCollectionDecorator'
  ],
  function (Backbone, FilteredCollectionDecorator, PagedCollectionDecorator) {

    describe("Filtered and Paged Collection", function(){
      "use strict";

      var collection = null;
      //var filteredCollection = null;
      var filteredAndPagedCollection = null;

      beforeEach(function(){
        var models = [];
        for(var i = 1; i <= 12; i++){
          models.push({id: i});
        }
        collection = new Backbone.Collection(models);
        var filteredCollection = new FilteredCollectionDecorator(null, {collection: collection});
        filteredAndPagedCollection = new PagedCollectionDecorator(null, {collection: filteredCollection});
      });

      describe("default behavior", function () {

        it("should return all models by default", function () {
          expect(filteredAndPagedCollection.length).to.equal(12);
        });

        it("should set filter configuration", function(){
          var config = filteredAndPagedCollection.getConfig().filterConfig;
          expect(typeof config.filter).to.equal("function");
        });

        it("should set paged configuration", function(){
          var config = filteredAndPagedCollection.getConfig().pagingConfig;
          expect(config.resultsPerPage).to.equal(Number.MAX_VALUE);
          expect(config.totalItems).to.equal(12);
          expect(config.currentPage).to.equal(1);
          expect(config.totalPages).to.equal(1);
        });

      });

      describe("when filter configuration provided", function(){

        var filter = function(model){
          return model.id % 2 === 0;
        }

        beforeEach(function(){
          var options = {
            collection: collection,
            filterConfig: {
              filter: filter
            }
          };
          var filteredCollection = new FilteredCollectionDecorator(null, options);
          filteredAndPagedCollection = new PagedCollectionDecorator(null, {collection: filteredCollection});
        });

        it("should set filter configuration", function(){
          var config = filteredAndPagedCollection.getConfig().filterConfig;
          expect(config.filter).to.equal(filter);
        });

        it("should contain only filtered models", function(){
          expect(filteredAndPagedCollection.length).to.equal(6);
          for(var i = 0; i < filteredAndPagedCollection.length; i++){
            expect(filteredAndPagedCollection.at(i).id).to.equal((i+1)*2);
          }
        });

        it("should allow filter configuration to be changed", function(){
          var newFilter = function(model){
            return model.id % 3 === 0;
          };
          filteredAndPagedCollection.updateConfiguration({
            filterConfig: {
              filter: newFilter
            }
          });
          expect(filteredAndPagedCollection.length).to.equal(4);
          for(var i = 0; i < filteredAndPagedCollection.length; i++){
            expect(filteredAndPagedCollection.at(i).id).to.equal((i+1)*3);
          }

          var filterConfig = filteredAndPagedCollection.getConfig().filterConfig;
          expect(filterConfig.filter).to.equal(newFilter);
        });

        describe("when underlying collection changes", function(){

          it("should include model in filtered set if matches filter", function(){
            collection.add({id: 14});
            expect(filteredAndPagedCollection.length).to.equal(7);
            for(var i = 0; i < filteredAndPagedCollection.length; i++){
              expect(filteredAndPagedCollection.at(i).id).to.equal((i+1)*2);
            }
          });

          it("should not include model in filtered set if it does not match filter", function(){
            collection.add({id: 13});
            expect(filteredAndPagedCollection.length).to.equal(6);
            for(var i = 0; i < filteredAndPagedCollection.length; i++){
              expect(filteredAndPagedCollection.at(i).id).to.equal((i+1)*2);
            }
          });

        });

      });

    });
  }
);
