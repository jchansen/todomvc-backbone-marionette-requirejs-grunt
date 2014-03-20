/*global define */

define(
  [
    'marionette',
    'tpl!./status.html',
    './CompletedCount'
  ],
  function (Marionette, template, CompletedCount) {
    'use strict';

    return Marionette.Layout.extend({
      template: template,
      className: 'filter',

      regions: {
        completedCount: '.clear-completed'
      },

      ui: {
        filters: '.filters a',
        activeCount: '.todo-count'
      },

      events: {
        'click #clear-completed': 'onClearClick'
      },

      onRender: function () {
        this.updateActiveCount();
        this.completedCount.show(new CompletedCount({ collection: this.collection }));
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

      },

      onClearClick: function () {
        window.app.vent.trigger('todoList:clear:completed');
      }
    });
  });
