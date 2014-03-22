/*global define */

define(
  [
    'marionette',
    'tpl!./todoListCompositeView.html',
    './TodoItemView',
    'app'
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
        var self = this;
        this.listenTo(this.collection, 'all', this.updateToggleCheckbox, this);
        this.listenTo(this.collection, 'all', this.updateVisibility, this);

        app.vent.on('todoList:filter', function (filter) {
          var completed = filter === "active" ? false : true;
          self.collection.filterBy(function(model){
            var status = model.get('completed');
            if(filter === "") return true;
            return status === completed;
          });
        });

        app.vent.on("todoList:page", function(pageNumber){
          self.collection.page({currentPage: pageNumber});
        });
      },

      onRender: function () {
        this.updateToggleCheckbox();
        this.updateVisibility();
      },

      updateVisibility: function(){
        this.$el.toggle(this.collection.length > 0);
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
          todo.set({ completed: isChecked });
          app.commands.execute("todo:update", todo);
        });
      }
    });
  });
