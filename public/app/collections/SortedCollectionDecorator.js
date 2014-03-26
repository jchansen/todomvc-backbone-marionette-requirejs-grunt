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
        comparator: function (model) {
          return true;
        }
      },
      configName: 'sortingConfig',

      setSortingConfig: function(options){
        options = options || {};
        var config = options[this.configName] || {};
        var _config = this._config;
        var _collection = this._collection;

        _.extend(_config, config);
        _config.comparator = _config.comparator || function(model){ return true; };
      },

      execute: function(options){
        this.setSortingConfig(options);
        var comparator = this._config.comparator;
        var sortedModels = this._collection.sortBy(comparator);
        this.reset(sortedModels, options);
      }

    });
  });
