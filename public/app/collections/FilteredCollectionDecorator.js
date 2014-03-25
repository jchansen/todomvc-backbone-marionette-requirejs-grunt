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

      defaultConfig: {
        filter: function(model){
          return true;
        }
      },
      configName: 'filterConfig',

      setFilterConfig: function(options){
        options = options || {};
        var config = options[this.configName] || {};
        var _config = this._config;
        var _collection = this._collection;

        _.extend(_config, config);
        _config.filter = _config.filter || function(model){ return true; };
      },

      execute: function(options){
        this.setFilterConfig(options);
        var filter = this._config.filter;
        var filteredModels = this._collection.filter(filter);
        this.reset(filteredModels, options);
      }

    });
  });
