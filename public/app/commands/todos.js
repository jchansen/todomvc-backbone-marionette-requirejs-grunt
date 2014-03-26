define(
  [
    'app',
    'q',
    'collections/FilteredCollectionDecorator',
    'collections/SortedCollectionDecorator',
    'collections/PagedCollectionDecorator'
  ],
  function (app, Q, FilteredCollectionDecorator, SortedCollectionDecorator, PagedCollectionDecorator) {

    var commands = function () {
      var _modelName = 'todo';
      var _repo = app.Repositories.Todos();

      app.commands.setHandler(_modelName + ":create", function (model) {
        _repo.add(model);
      });

      app.commands.setHandler(_modelName + ":update", function (model) {
        _repo.update(model);
      });

      app.commands.setHandler(_modelName + ":delete", function (model) {
        _repo.remove(model);
      });

    };

    var requests = function(){

      app.reqres.setHandler("todoList", function (model) {
        var defer = Q.defer();
        app.Repositories.Todos().getAll().done(function (todos) {
          defer.resolve(todos);
        });
        return defer.promise;
      });

      function generateDecoratedTodoList(todos){
        var filteredList = new FilteredCollectionDecorator(null, {collection: todos});
        var sortedList = new SortedCollectionDecorator(null, {collection: filteredList});
        var pagedList = new PagedCollectionDecorator(null, {
          collection: sortedList,
          pagingConfig: {
            resultsPerPage: 4
          }
        });
        return pagedList;
      }

      var decoratedTodoList = null;
      app.reqres.setHandler("todoList:paged", function (model) {
        var defer = Q.defer();
        app.reqres.request("todoList").done(function (todos) {
          decoratedTodoList = decoratedTodoList || generateDecoratedTodoList(todos);
          defer.resolve(decoratedTodoList);
        });
        return defer.promise;
      });
    };

    app.on("initialize:after", function () {
      commands();
      requests();
    });

  });