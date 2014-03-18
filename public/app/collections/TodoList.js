/*global define */

define(
  [
    'backbone',
    'models/Todo'
  ],
  function (Backbone, Todo) {
    'use strict';

    function isCompleted(todo) {
      return todo.get('completed');
    }

    return Backbone.Collection.extend({
      model: Todo,
      url: "http://todomvc-api.herokuapp.com/api/todos",

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
