define(
  [
    'conductor',
    './Paging'
  ],
  function (Conductor, View) {
    'use strict';

    return Conductor.ItemViewModule.extend({
      view: View
    });

  });