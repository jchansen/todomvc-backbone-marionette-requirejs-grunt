/*global define */

define(
  [
    'backbone',
    'models/Todo',
    'backbone.sync.socketio'
  ],
  function (Backbone, Todo, sync) {
    'use strict';

    function isCompleted(todo) {
      return todo.get('completed');
    }

    return Backbone.Collection.extend({
      model: Todo,
      //url: "http://todomvc-api.herokuapp.com/api/todos",
      //url: "http://localhost:3001/api/todos",
      //backend: 'mybackend',

      getCompleted: function () {
        return this.filter(isCompleted);
      },

      getActive: function () {
        return this.reject(isCompleted);
      },

      comparator: function (todo) {
        return todo.get('created');
      },

      sync: sync
    });
  });
