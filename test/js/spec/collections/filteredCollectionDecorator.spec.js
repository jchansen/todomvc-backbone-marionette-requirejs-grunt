define(
  [
    'backbone',
    'collections/FilteredCollectionDecorator'
  ],
  function (Backbone, FilteredCollectionDecorator) {

    describe("Filtered Collection Decorator", function(){
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
          var pagedCollection = new FilteredCollectionDecorator(null, {collection: collection});
          expect(pagedCollection.length).to.equal(12);
        });

        it("should set filter configuration", function(){
          var pagedCollection = new FilteredCollectionDecorator(null, {collection: collection});
          var config = pagedCollection.getConfig().filterConfig;
          expect(typeof config.filter).to.equal("function");
        });

      });

      describe("when filter configuration provided", function(){

        var options = null;
        var filteredCollection = null;
        var filter = function(model){
          return model.id % 2 === 0;
        }

        beforeEach(function(){
          options = {
            collection: collection,
            filterConfig: {
              filter: filter
            }
          };
          filteredCollection = new FilteredCollectionDecorator(null, options);
        });

        it("should set filter configuration", function(){
          var config = filteredCollection.getConfig().filterConfig;
          expect(config.filter).to.equal(filter);
        });

        it("should contain only filtered models", function(){
          expect(filteredCollection.length).to.equal(6);
          for(var i = 0; i < filteredCollection.length; i++){
            expect(filteredCollection.at(i).id).to.equal((i+1)*2);
          }
        });

        it("should allow filter configuration to be changed", function(){
          var newFilter = function(model){
            return model.id % 3 === 0;
          };
          filteredCollection.updateConfiguration({
            filterConfig: {
              filter: newFilter
            }
          });
          expect(filteredCollection.length).to.equal(4);
          for(var i = 0; i < filteredCollection.length; i++){
            expect(filteredCollection.at(i).id).to.equal((i+1)*3);
          }

          var filterConfig = filteredCollection.getConfig().filterConfig;
          expect(filterConfig.filter).to.equal(newFilter);
        });

        describe("when underlying collection changes", function(){

          it("should include model in filtered set if matches filter", function(){
            collection.add({id: 14});
            expect(filteredCollection.length).to.equal(7);
            for(var i = 0; i < filteredCollection.length; i++){
              expect(filteredCollection.at(i).id).to.equal((i+1)*2);
            }
          });

          it("should not include model in filtered set if it does not match filter", function(){
            collection.add({id: 13});
            expect(filteredCollection.length).to.equal(6);
            for(var i = 0; i < filteredCollection.length; i++){
              expect(filteredCollection.at(i).id).to.equal((i+1)*2);
            }
          });

        });

      });

    });
  }
);
