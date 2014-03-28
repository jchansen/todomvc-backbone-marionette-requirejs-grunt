/*global define */

define(
  [
    'backbone',
    'globals'
  ],
  function (Backbone, globals) {
    'use strict';

    return Backbone.Model.extend({
      urlRoot: globals.API_ROOT_URL + "/api/todos",
      idAttribute: "_id",

      defaults: {
        title: '',
        completed: false,
        created: 0
      },

      initialize: function () {
        if (this.isNew()) {
          this.set('created', Date.now());
        }
      },

      toggle: function () {
        return this.set('completed', !this.get('completed'));
      }
    });
  });

