define(
  [
    'conductor',
    './TodoListCompositeView',
    'app',
    'q',
    'modules/common/loading/View'
  ],
  function (Conductor, View, app, Q, LoadingView) {
    'use strict';

    return Conductor.CompositeViewModule.extend({
      view: View,
      data: {
        collection: function(){
          var defer = Q.defer();
          app.reqres.request("todoList:paged").done(function(todos){
            defer.resolve(todos);
          });
          return defer.promise;
        }
      },
      loadingView: LoadingView
    });

  });