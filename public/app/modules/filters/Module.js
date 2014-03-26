define(
  [
    'conductor',
    './Layout',
    './status/Module',
    './paging/Module',
    './sorting/Module'
  ],
  function (Conductor, Layout, StatusFilterModule, PagingFilterModule, SortingFilterModule) {

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
        },
        {
          module: SortingFilterModule,
          region: "sortingFilterRegion"
        }
      ]

    });
  });