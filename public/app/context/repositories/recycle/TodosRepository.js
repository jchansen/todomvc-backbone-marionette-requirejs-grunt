define(
  [
    'q',
    'collections/TodoList',
    'models/Todo'
  ],
  function (Q, Todos, Todo) {

    var todos = new Todos();
    var defer = Q.defer();
    var promise = defer.promise;

    var _fetchCollection = function () {
      var that = this;
      todos.fetch()
        .done(function (collection, response, options) {
          defer.resolve(todos);
        });
    };
    _fetchCollection();

    return {
//      getAll: function (options) {
//        var defer = Q.defer();
//        if (todos) defer.resolve(todos);
//        todos = new Todos();
//        todos.fetch({
//          success: function (model, res, options) {
//            defer.resolve(todos);
//          },
//          data: options
//        });
//        return defer.promise;
//      },

      getAll: function (options) {
        return promise;
      },

      getById: function (id) {
        var defer = Q.defer();
        var todo = new Todo({id: Number(id)});
        todo.fetch({
          success: function (model, res, options) {
            defer.resolve(todo);
          }
        });
        return defer.promise;
      }

    }

  });