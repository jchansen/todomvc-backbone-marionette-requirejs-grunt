/*global define */

define(
  [
    'marionette',
    'tpl!./header.html',
    'app',
    'models/Todo'
  ],
  function (Marionette, template, app, Todo) {
    'use strict';

    return Marionette.ItemView.extend({
      template: template,
      className: "header",

      ui: {
        input: '#new-todo'
      },

      events: {
        'keypress #new-todo': 'onInputKeypress'
      },

      onInputKeypress: function (event) {
        var ENTER_KEY = 13;
        var todoText = this.ui.input.val().trim();
        var todo = null;

        if (event.which === ENTER_KEY && todoText) {
          todo = new Todo({
            title: todoText
          });
          this.ui.input.val('');
          app.commands.execute("todo:create", todo);
        }
      }
    });
  });
