/*global define */

define(
  [
    'backbone'
  ],
  function (Backbone) {
    'use strict';

    var _cache = null;
    var _filter = function(model){
      return true;
    };

    return Backbone.Collection.extend({
      initialize: function(models, options){
        _cache = options.cache;
        options = options || {};
        this.filterBy(options.filter || _filter, _.extend({silent: true}, options));
        this.listenTo(_cache, "all", this.onCacheUpdated, this);
      },

      onCacheUpdated: function(event){
        this.filterBy(_filter);
      },

      filterBy: function(filter, options){
        _filter = filter || _filter;
        var models = _cache.filter(_filter);
        this.reset(models, options);
      },

      // todo: move into FilteredTodoList class
      getCompleted: function () {
        return _cache.getCompleted();
      },

      getActive: function () {
        return _cache.getActive();
      }
    });
  });
