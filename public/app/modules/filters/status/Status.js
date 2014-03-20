/*global define */

define(
  [
    'marionette',
    'tpl!./status.html'
  ],
  function (Marionette, template) {
    'use strict';

    return Marionette.Layout.extend({
      template: template,
      className: 'filter',

      ui: {
        filters: '.filters a',
        activeCount: '.todo-count',
        completedCount: '.clear-completed'
      },

      events: {
        'click #clear-completed': 'onClearClick'
      },

      initialize: function(options){
        this.listenTo(this.collection, 'all', this.updateActiveCount, this);
        this.listenTo(this.collection, 'all', this.updateCompletedCount, this);
      },

      onRender: function () {
        this.updateActiveCount();
        this.updateCompletedCount();
      },

      updateFilterSelection: function (filter) {
        this.ui.filters
          .removeClass('selected')
          .filter('[href="#/' + filter + '"]')
          .addClass('selected');
      },

      updateActiveCount: function(){
        var itemsLeft = this.collection.getActive().length;
        var itemsWord = itemsLeft < 1 || itemsLeft > 1 ? 'items' : 'item';
        this.ui.activeCount.html('<strong>' + itemsLeft + '</strong> ' + itemsWord + ' left');
      },

      updateCompletedCount: function(){
        var completedTodos = this.collection.getCompleted();
        this.ui.completedCount
          .toggle(completedTodos.length > 0)
          .html('Clear completed (' + completedTodos.length + ')');
      },

      onClearClick: function () {
        window.app.vent.trigger('todoList:clear:completed');
      }
    });
  });
