/*global define */

define(
  [
    'backbone',
    'underscore'
  ],
  function (Backbone, _) {
    'use strict';

    var CollectionDecorator = Backbone.Collection.extend({

      // FilterCollection.prototype.initialize.apply(this, models, options);
      initialize: function(models, options){
        if(!(options.collection instanceof Backbone.Collection)) throw new Error("must pass in collection");
        this._collection = options.collection;
        this.listenTo(this._collection, "all", this.onCollectionUpdated, this);
        options = _.extend({silent: true}, options);
        this.execute(options);
      },

      onCollectionUpdated: function(event){
        this.execute();
      },

      getConfig: function(){
        return {filterConfig: _.clone(this._filterConfig)};
      },

      execute: function(options){
        this.setFilterConfig(options);
        var filter = this._filterConfig.filter;
        var filteredModels = this._collection.filter(filter);
        this.reset(filteredModels, options);
      },

      updateConfiguration: function(options){
        // normally when a collection is updated, it sends an event that triggers the callback on
        // higher level decorators that in turn call execute. If we don't pass in silent:true,
        // we'll end up in a loop where execute gets called once per decorator.
        if(this._collection instanceof CollectionDecorator){
          this._collection.updateConfiguration(_.extend({silent: true}, options));
        }
        this.execute(options);
      }

    });

    return CollectionDecorator;
  });
