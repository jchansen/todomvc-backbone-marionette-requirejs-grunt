/*global define */

define(
  [
    'marionette',
    'tpl!./todoListCompositeView.html',
    './TodoItemView'
  ],
  function (Marionette, template, ItemView) {
    'use strict';

    return Marionette.CompositeView.extend({
      template: template,
      className: "main",

      itemView: ItemView,

      itemViewContainer: '#todo-list',

      ui: {
        toggle: '#toggle-all'
      },

      events: {
        'click #toggle-all': 'onToggleAllClick'
      },

      initialize: function () {
        this.listenTo(this.collection, 'all', this.updateToggleCheckbox, this);

        app.vent.on('todoList:filter', function (filter) {
          if (footer) footer.updateFilterSelection(filter);

          document.getElementsByClassName('todoapp')[0].className = 'filter-' + (filter === '' ? 'all' : filter);
        });
      },

      onRender: function () {
        this.updateToggleCheckbox();
      },

      updateToggleCheckbox: function () {
        var allCompleted = this.collection.reduce(function (lastModel, thisModel) {
          return lastModel && thisModel.get('completed');
        }, true);

        this.ui.toggle.prop('checked', allCompleted);
      },

      onToggleAllClick: function (event) {
        var isChecked = event.currentTarget.checked;

        this.collection.each(function (todo) {
          todo.save({ completed: isChecked });
        });
      }
    });
  });
