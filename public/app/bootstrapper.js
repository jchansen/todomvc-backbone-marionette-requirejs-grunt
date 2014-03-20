/*global define */

define(
  [
//    'modules/banner/Module',
//    'modules/notepad/Module',
//    'modules/filters/Module',
//    'modules/info/Module',

    // routers and controllers
    'routers/index'
  ],
  function (BannerModule, NotepadModule, FiltersModule, InfoModule) {
    'use strict';

    return {
      run: function(){

//        app.addInitializer(function () {
//          (new BannerModule()).render(app.banner).done();
//          (new NotepadModule()).render(app.notepad).done();
//          (new FiltersModule()).render(app.filters).done();
//          (new InfoModule()).render(app.info).done();
//        });

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
