define(
  [
    'conductor',
    './Status',
    'app',
    'q'
  ],
  function (Conductor, View, app, Q) {
    'use strict';

    return Conductor.ItemViewModule.extend({
      view: View,

      data: {
        collection: function () {
          var defer = Q.defer();
          app.reqres.request("todoList").done(function(todos){
            defer.resolve(todos);
          });
          return defer.promise;
        }
      }
    });

  });