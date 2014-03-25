/*global define */

define(
  [
    'backbone',
    'underscore',
    './CollectionDecorator'
  ],
  function (Backbone, _, CollectionDecorator) {
    'use strict';

    return CollectionDecorator.extend({

      // defaultConfig: {filter: function(){}}
      // configName: 'filterConfig'

      // this._config = defaultConfig;
      // CAN REMOVE
      initialize: function(models, options){
        this._filterConfig = {
          filter: function(model){
            return true;
          }
        };
        CollectionDecorator.prototype.initialize.apply(this, [models, options]);
      },

      // config[configName] = _.clone(this._config);
      // CAN REMOVE
      getConfig: function(){
        var config = {};
        config.filterConfig = _.clone(this._filterConfig);
        if(this._collection instanceof CollectionDecorator) _.defaults(config, this._collection.getConfig());
        return config;
      },

      // setConfig...
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
      }

    });
  });
