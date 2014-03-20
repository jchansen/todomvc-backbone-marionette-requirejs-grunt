/*global define */

define(
  [
    'marionette',
    'tpl!./banner.html'
  ],
  function (Marionette, template) {
    'use strict';

    return Marionette.ItemView.extend({
      template: template
    });
  });
