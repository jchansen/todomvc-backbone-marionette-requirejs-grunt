/*global define */

define(
  [
    'backbone',
    'models/Todo',
    'globals'
  ],
  function (Backbone, Todo, globals) {
    'use strict';

    function isCompleted(todo) {
      return todo.get('completed');
    }

    return Backbone.Collection.extend({
      model: Todo,
      url: globals.API_ROOT_URL + "/api/todos",

      getCompleted: function () {
        return this.filter(isCompleted);
      },

      getActive: function () {
        return this.reject(isCompleted);
      },

      comparator: function (todo) {
        return todo.get('created');
      }

    });
  });
