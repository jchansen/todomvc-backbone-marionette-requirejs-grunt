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
      var filteredCollection = null;
      var filteredAndPagedCollection = null;

      beforeEach(function(){
        var models = [];
        for(var i = 1; i <= 12; i++){
          models.push({id: i});
        }
        collection = new Backbone.Collection(models);
        filteredCollection = new FilteredCollectionDecorator(null, {collection: collection});
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

    });
  }
);
