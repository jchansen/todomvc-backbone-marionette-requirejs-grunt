define(
  [
    'conductor',
    './TodoListCompositeView',
    'app',
    'q'
  ],
  function (Conductor, View, app, Q) {
    'use strict';

    return Conductor.CompositeViewModule.extend({
      view: View,
      data: {
        collection: function(){
          var defer = Q.defer();
          app.Repositories.Todos().getAll().done(function(todos){
            defer.resolve(todos);
          });
          return defer.promise;
        }
      }
    });

  });