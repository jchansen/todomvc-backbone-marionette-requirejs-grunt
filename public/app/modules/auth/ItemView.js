/*global define */

define(
  [
    'marionette',
    'tpl!./user.html'
  ],
  function (Marionette, template) {
    'use strict';

    return Marionette.ItemView.extend({
      template: template
    });
  });
