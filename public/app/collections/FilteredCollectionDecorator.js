/*global define */

define(
  [
    'backbone',
    'underscore'
  ],
  function (Backbone, _) {
    'use strict';

    return Backbone.Collection.extend({

      initialize: function(models, options){
        if(!(options.collection instanceof Backbone.Collection)) throw new Error("must pass in collection");
        this._collection = options.collection;
        this._filterConfig = {
          filter: function(model){
            return true;
          }
        };
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

      setFilterConfig: function(options){
        options = options || {};
        var filterConfig = options.filterConfig || {};
        var _filterConfig = this._filterConfig;
        var _collection = this._collection;

        _.extend(_filterConfig, filterConfig);
        _filterConfig.filter = _filterConfig.filter || function(model){ return true; };
      },

      execute: function(options){
        this.setFilterConfig(options);
        var filter = this._filterConfig.filter;
        var filteredModels = this._collection.filter(filter);
        this.reset(filteredModels, options);
      },

      updateConfiguration: function(options){
        this.execute(options);
      }

    });
  });
