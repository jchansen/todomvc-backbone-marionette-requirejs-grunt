/*global define */

define(
  [
    'marionette',
    'tpl!./template.html',
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
        'click li a': 'onSort'
      },

      initialize: function(options){
        var self = this;
        this.listenTo(this.collection, 'all', this.updateVisibility, this);
        app.vent.on('todoList:sort', this.updateSortingFilter, this);
      },

      updateSortingFilter: function (filter) {
        var property = null;
        if(filter == "date") {
          property = "created";
        } else if(filter == "title") {
          property = "title";
        }else if(filter == "completed") {
          property = "completed";
        }else{
          throw "unknown sorting filter: " + filter;
        }

        var newComparator = function(model){
          return model.get(property);
        }

        this.collection.updateConfiguration({
          sortingConfig: {
            comparator: newComparator
          }
        });

        this.updateSortingFilterSelection(filter);
      },

      onSort: function(e){
        e.preventDefault();

        var href = $(e.target).attr('href'),
            filter = null;

        if (href === "#date") {
          filter = 'date';
        } else if (href === "#title") {
          filter = 'title';
        } else if (href === "#completed") {
          filter = 'completed';
        } else {
          throw "unknown filter: " + href;
        }

        app.vent.trigger('todoList:sort', filter);
      },

      onRender: function () {
        this.updateVisibility();
      },

      updateVisibility: function(){
        this.$el.toggle(this.collection.length > 0);
      },

      updateSortingFilterSelection: function (filter) {
        this.ui.filters
          .removeClass('selected')
          .filter('[href="#' + filter + '"]')
          .addClass('selected');
      }
    });
  });
