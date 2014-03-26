define(
  [
    'app',
    'q',
    'collections/FilteredCollectionDecorator',
    'collections/PagedCollectionDecorator'
  ],
  function (app, Q, FilteredCollectionDecorator, PagedCollectionDecorator) {

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

      var filteredTodoList = null;
      app.reqres.setHandler("todoList:filtered", function (model) {
        var defer = Q.defer();
        app.reqres.request("todoList").done(function (todos) {
          filteredTodoList = filteredTodoList || new FilteredCollectionDecorator(null, {collection: todos});
          defer.resolve(filteredTodoList);
        });
        return defer.promise;
      });

      var pagedFilteredTodoList = null;
      app.reqres.setHandler("todoList:paged", function (model) {
        var defer = Q.defer();
        app.reqres.request("todoList:filtered").done(function (todos) {
          pagedFilteredTodoList = pagedFilteredTodoList || new PagedCollectionDecorator(null, {
            collection: todos,
            pagingConfig: {
              resultsPerPage: 4
            }
          });
          defer.resolve(pagedFilteredTodoList);
        });
        return defer.promise;
      });
    };

    app.on("initialize:after", function () {
      commands();
      requests();
    });

  });