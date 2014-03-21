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
