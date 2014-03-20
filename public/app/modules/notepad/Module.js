define(
  [
    'conductor',
    './Layout',
    './header/Module',
    './list/Module'
  ],
  function (Conductor, Layout, HeaderModule, ListModule) {

    return Conductor.LayoutModule.extend({
      view: Layout,

      submodules: [
        {
          module: HeaderModule,
          region: "headerRegion"
        },
        {
          module: ListModule,
          region: "listRegion"
        }
      ]

    });
  });