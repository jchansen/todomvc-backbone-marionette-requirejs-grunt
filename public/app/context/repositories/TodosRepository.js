define(
  [
    'context/BackboneRepository',
    'collections/TodoList',
    'context/loggers/RepositoryLogger',
    'context/realtime/SocketIoMediator',
    'globals'
  ],
  function (BackboneRepository, TodoList, RepositoryLogger, SocketIoMediator, globals) {

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
          url: globals.API_ROOT_URL,
          channel: "/todos"
        })
      }

    });

    return Repository;
  });