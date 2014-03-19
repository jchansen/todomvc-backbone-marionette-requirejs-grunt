/*global define */

define(
  [
    'marionette',
    'collections/TodoList',
    'modules/header/Module',
    'modules/footer/Module',
    'modules/main/Module'
  ],
  function (Marionette, TodoList, HeaderModule, FooterModule, MainModule) {
    'use strict';

    return {
      run: function(){
        var todoList = new TodoList();

        var viewOptions = {
          collection: todoList
        };

        var header = null;
        var main = null;
        var footer = null;

        app.addInitializer(function () {
          var headerModule = new HeaderModule(viewOptions);
          headerModule.render(app.header).done(function(view){
            header = view;
          });

          var mainModule = new MainModule();
          mainModule.render(app.main).done(function(view){
            main = view;
          });

          var footerModule = new FooterModule(viewOptions);
          footerModule.render(app.footer).done(function(view){
            footer = view;
          });

          todoList.fetch();
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
