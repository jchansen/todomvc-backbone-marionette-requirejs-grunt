/*global define */

define(
  [
    'marionette',
    'collections/TodoList',
    'modules/header/Module',
    'modules/main/TodoListCompositeView',
    'modules/footer/Module'
  ],
  function (Marionette, TodoList, HeaderModule, TodoListCompositeView, FooterModule) {
    'use strict';

    var app = new Marionette.Application();
    var todoList = new TodoList();

    var viewOptions = {
      collection: todoList
    };

    var header = null;
    var main = new TodoListCompositeView(viewOptions);
    var footer = null;

    app.addRegions({
      header: '#header',
      main: '#main',
      footer: '#footer'
    });

    app.addInitializer(function () {
      var headerModule = new HeaderModule(viewOptions);
      headerModule.render(app.header).done(function(view){
        header = view;
      });

      app.main.show(main);

      var footerModule = new FooterModule(viewOptions);
      footerModule.render(app.footer).done(function(view){
        footer = view;
      });

      todoList.fetch();
    });

    app.listenTo(todoList, 'all', function () {
      app.main.$el.toggle(todoList.length > 0);
      app.footer.$el.toggle(todoList.length > 0);
    });

    app.vent.on('todoList:filter', function (filter) {
      if(footer) footer.updateFilterSelection(filter);

      document.getElementById('todoapp').className = 'filter-' + (filter === '' ? 'all' : filter);
    });

    app.vent.on('todoList:clear:completed', function () {
      todoList.getCompleted().forEach(function (todo) {
        todo.destroy();
      });
    });

    return window.app = app;
  });
