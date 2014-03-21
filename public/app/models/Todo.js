/*global define */

define(
  [
    'backbone'
  ],
  function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
      urlRoot: "http://todomvc-api.herokuapp.com/api/todos",
      //urlRoot: "http://localhost:3001/api/todos",
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

