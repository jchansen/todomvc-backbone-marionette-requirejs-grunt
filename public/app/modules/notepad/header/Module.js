define(
  [
    'conductor',
    './Header',
    'app',
    'q'
  ],
  function (Conductor, View, app, Q) {
    'use strict';

    return Conductor.ItemViewModule.extend({
      view: View
    });

  });