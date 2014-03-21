define(
  [
    'context/BackboneRepository',
    'collections/TodoList',
    'context/loggers/RepositoryLogger'
  ],
  function (BackboneRepository, TodoList, RepositoryLogger) {

    var Repository = BackboneRepository.extend({
      _collectionType: TodoList,
      _logger: null,

      initialize: function (options) {
        BackboneRepository.prototype.initialize.apply(this, arguments);
        this._logger = new RepositoryLogger({
          plural: "todos",
          singular: "todo",
          repository: this,
          description: function(model){
            return model.get('title');
          }
        });
      }

    });

    return Repository;
  });