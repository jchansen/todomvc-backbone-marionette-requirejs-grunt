/*global define */

define(
  [
    'backbone'
  ],
  function (Backbone) {
    'use strict';

    return Backbone.Collection.extend({
      _cache: null,

      initialize: function(options){
        this._cache = options.cache;
      },

      getCompleted: function () {
        return this._cache.getCompleted();
      },

      getActive: function () {
        return this._cache.getActive();
      },

      comparator: function (todo) {
        return todo.get('created');
      },

      page: function(){

      }
    });
  });
