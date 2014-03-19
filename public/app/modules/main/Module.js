define(
  [
    'conductor',
    './Layout',
    './list/Module',
    './filter/Module',
    'app',
    'q'
  ],
  function (Conductor, Layout, ListModule, FilterModule, app, Q) {

    return Conductor.LayoutModule.extend({
      view: Layout,

      submodules: [
        {
          module: ListModule,
          region: "listRegion"
        },
        {
          module: FilterModule,
          region: "filterRegion"
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