define(
  [
    'marionette',
    './repositories/TodosRepository'
  ],
  function (Marionette, TodosRepository) {

    var Repositories = Marionette.Controller.extend({

      _todos: null,
      Todos: function () {
        if (this._todos === null) {
          this._todos = new TodosRepository();
        }
        return this._todos;
      }

    });

    return Repositories;
  });