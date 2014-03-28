define(
  [
    'context/BackboneRepository',
    'collections/TodoList',
    'context/loggers/RepositoryLogger',
    'context/realtime/SocketIoMediator'
  ],
  function (BackboneRepository, TodoList, RepositoryLogger, SocketIoMediator) {

    var Repository = BackboneRepository.extend({
      _collectionType: TodoList,

      initialize: function (options) {
        BackboneRepository.prototype.initialize.apply(this, arguments);
        this.logger = new RepositoryLogger({
          plural: "todos",
          singular: "todo",
          repository: this,
          description: function(model){
            return model.get('title');
          }
        });

        this.mediator = new SocketIoMediator({
          repository: this,
          channel: "/todos"
        })
      }

    });

    return Repository;
  });