/*global define */

define(
  [
    'marionette',
    'tpl!./paging.html'
  ],
  function (Marionette, template) {
    'use strict';

    return Marionette.ItemView.extend({
      template: template,

      ui: {
        pages: '.filters a'
      },

      initialize: function(options){
        this.listenTo(this.collection, 'all', this.updateVisibility, this);

        // update paging options with filtered collection
        app.vent.on('todoList:filter', function (filter) {
          var completed = filter === "active" ? false : true;
//          app.Repositories.Todos().filterCollectionProvided({
//            collection: self.collection,
//            filter: function(model){
//              var status = model.get('completed');
//              if(filter === "") return true;
//              return status === completed;
//            }
//          }).done();
        });
      },

      onRender: function () {
        this.updatePage();
        this.updateVisibility();
      },

      updateVisibility: function(){
        this.$el.toggle(this.collection.length > 0);
      },

      updatePage: function(){
        this.ui.pages
          .removeClass('selected')
          .filter('[href="#"]')
          .first()
          .addClass('selected');
      }
    });
  });
