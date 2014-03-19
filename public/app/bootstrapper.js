/*global define */

define(
  [
    'marionette',
    'collections/TodoList',
    'modules/header/Module',
    'modules/main/Module'
  ],
  function (Marionette, TodoList, HeaderModule, MainModule) {
    'use strict';

    return {
      run: function(){

        app.addInitializer(function () {
          var headerModule = new HeaderModule();
          headerModule.render(app.header).done();

          var mainModule = new MainModule();
          mainModule.render(app.main).done();
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
