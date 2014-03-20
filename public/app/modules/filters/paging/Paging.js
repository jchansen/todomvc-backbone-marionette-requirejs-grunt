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
      className: 'filter'
    });
  });
