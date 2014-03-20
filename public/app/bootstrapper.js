/*global define */

define(
  [
    'modules/banner/Module',
    'modules/header/Module',
    'modules/main/list/Module',
    'modules/main/filter/Module',
    'modules/info/Module',

    // routers and controllers
    'routers/index',
    'controllers/index'
  ],
  function (BannerModule, HeaderModule, ListModule, FilterModule, InfoModule, Router, Controller) {
    'use strict';

    return {
      run: function(){

        new Router({ controller: Controller });

        app.addInitializer(function () {
          (new BannerModule()).render(app.banner).done();
          (new HeaderModule()).render(app.header).done();
          (new ListModule()).render(app.list).done();
          (new FilterModule()).render(app.filter).done();
          (new InfoModule()).render(app.info).done();
        });

//        app.listenTo(todoList, 'all', function () {
//          app.main.$el.toggle(todoList.length > 0);
//          app.footer.$el.toggle(todoList.length > 0);
//        });
//
//        app.vent.on('todoList:filter', function (filter) {
//          if(footer) footer.updateFilterSelection(filter);
//
//          document.getElementById('todoapp').className = 'filter-' + (filter === '' ? 'all' : filter);
//        });
//
//        app.vent.on('todoList:clear:completed', function () {
//          todoList.getCompleted().forEach(function (todo) {
//            todo.destroy();
//          });
//        });

        app.start();
      }
    }

  });
