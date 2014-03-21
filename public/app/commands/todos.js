define(
  [
    'app'
  ],
  function (app) {

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

    app.on("initialize:after", function () {
      commands();
    });

  });