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
          this._todos = TodosRepository;
        }
        return this._todos;
      }

    });

    return Repositories;
  });