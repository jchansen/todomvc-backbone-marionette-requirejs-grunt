/*global define */

define(
  [
    'marionette',
    'tpl!./status.html',
    'app'
  ],
  function (Marionette, template, app) {
    'use strict';

    return Marionette.ItemView.extend({
      template: template,
      className: "filter",

      ui: {
        filters: '.filters a',
        activeCount: '.todo-count',
        completedCount: '.clear-completed'
      },

      events: {
        'click #clear-completed': 'onClearClick',
        'click li a': 'onFilter'
      },

      initialize: function(options){
        var self = this;
        this.listenTo(this.collection, 'all', this.updateActiveCount, this);
        this.listenTo(this.collection, 'all', this.updateCompletedCount, this);
        this.listenTo(this.collection, 'all', this.updateVisibility, this);

        self.filteredCollection = options.filteredCollection;
        app.vent.on('todoList:filter', function (filter) {
          self.updateFilterSelection(filter);

          var completed = filter === "active" ? false : true;
          var newFilter = function(model){
            var status = model.get('completed');
            if(filter === "") return true;
            return status === completed;
          };
          self.filteredCollection.updateConfiguration({
            filterConfig: {
              filter: newFilter
            }
          });
        });
      },

      onFilter: function(e){
        e.preventDefault();

        var href = $(e.target).attr('href'),
            filter = null;

        if (href === "#") {
          filter = '';
        } else if (href === "#active") {
          filter = 'active';
        } else if (href === "#completed") {
          filter = 'completed';
        } else {
          throw "unknown filter: " + href;
        }

        app.vent.trigger('todoList:filter', filter);
      },

      onRender: function () {
        this.updateActiveCount();
        this.updateCompletedCount();
        this.updateVisibility();
      },

      updateVisibility: function(){
        this.$el.toggle(this.collection.length > 0);
      },

      updateFilterSelection: function (filter) {
        this.ui.filters
          .removeClass('selected')
          .filter('[href="#' + filter + '"]')
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
          //.toggle(completedTodos.length > 0)
          .toggle(false) // hide the button until the logic exists to implement it
          .html('Clear completed (' + completedTodos.length + ')');
      },

      onClearClick: function () {
        app.vent.trigger('todoList:clear:completed');
      }
    });
  });
