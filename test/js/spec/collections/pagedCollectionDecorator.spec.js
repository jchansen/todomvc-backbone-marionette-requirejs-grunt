define(
  [
    'backbone',
    'collections/PagedCollectionDecorator'
  ],
  function (Backbone, PagedCollectionDecorator) {

    describe("Paged Collection Decorator", function(){
      "use strict";

      var collection = null;

      beforeEach(function(){
        var models = [];
        for(var i = 1; i <= 12; i++){
          models.push({id: i});
        }
        collection = new Backbone.Collection(models);
      });

      describe("default behavior", function () {

        it("should return all models by default", function () {
          var pagedCollection = new PagedCollectionDecorator(null, {collection: collection});
          expect(pagedCollection.length).to.equal(12);
        });

      });

      describe("when paging configuration provided", function(){

        var options = null;
        var pagedCollection = null;

        beforeEach(function(){
          options = {
            collection: collection,
            pagingConfig: {
              resultsPerPage: 5
            }
          };
          pagedCollection = new PagedCollectionDecorator(null, options);
        });

        it("should return first page when paging configuration provided", function(){
          expect(pagedCollection.length).to.equal(5);
          for(var i = 0; i < pagedCollection.length; i++){
            expect(pagedCollection.at(i).id).to.equal(i+1);
          }
        });

        it("should return second page with correct models", function(){
          pagedCollection.setPage(2);
          expect(pagedCollection.length).to.equal(5);
          for(var i = 0; i < pagedCollection.length; i++){
            expect(pagedCollection.at(i).id).to.equal(i+1+5);
          }
        });

        it("should return last page with correct models", function(){
          pagedCollection.setPage(3);
          expect(pagedCollection.length).to.equal(2);
          for(var i = 0; i < pagedCollection.length; i++){
            expect(pagedCollection.at(i).id).to.equal(i+1+5+5);
          }
        });

      });

    });
  }
);
