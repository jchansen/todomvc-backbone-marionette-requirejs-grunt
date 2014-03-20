/*global define */

define(
  [
    'marionette',
    'tpl!./info.html'
  ],
  function (Marionette, template) {
    'use strict';

    return Marionette.ItemView.extend({
      template: template,
      className: "info"
    });
  });
