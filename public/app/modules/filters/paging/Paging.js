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

      onRender: function () {
        this.updatePage();
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
