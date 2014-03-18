define(
  [
    'conductor',
    './Footer'
  ],
  function (Conductor, View) {
    'use strict';

    return Conductor.ItemViewModule.extend({
      view: View
    });

  });