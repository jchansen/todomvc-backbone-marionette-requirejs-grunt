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
          app.Repositories.Todos().getAll().done(function(todos){
            //setTimeout(function(){
              defer.resolve(todos);
            //}, 1000);
          });
          return defer.promise;
        }
      },
      loadingView: LoadingView
    });

  });