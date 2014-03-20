define(
  [
    'conductor',
    './Layout',
    './status/Module',
    './paging/Module'
  ],
  function (Conductor, Layout, StatusFilterModule, PagingFilterModule) {

    return Conductor.LayoutModule.extend({
      view: Layout,

      submodules: [
        {
          module: StatusFilterModule,
          region: "statusFilterRegion"
        },
        {
          module: PagingFilterModule,
          region: "pagingFilterRegion"
        }
      ]

    });
  });