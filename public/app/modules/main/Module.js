define(
  [
    'conductor',
    './Layout',
    './list/Module',
    'app',
    'q'
  ],
  function (Conductor, Layout, ListModule, app, Q) {

    return Conductor.LayoutModule.extend({
      view: Layout,

      submodules: [
        {
          module: ListModule,
          region: "listRegion"
        }
      ],

      data: {
        collection: function () {
          var defer = Q.defer();
          app.Repositories.Todos().getAll().done(function (todos) {
            defer.resolve(todos);
          });
          return defer.promise;
        }
      }

    });
  });