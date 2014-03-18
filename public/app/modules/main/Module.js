define(
  [
    'conductor',
    './TodoListCompositeView'
  ],
  function (Conductor, View) {
    'use strict';

    return Conductor.CompositeViewModule.extend({
      view: View
    });

  });