define(
  [
    'context/BackboneRepository',
    'collections/TodoList',
    'context/loggers/RepositoryLogger',
    'q',
    'socket.io'
  ],
  function (BackboneRepository, TodoList, RepositoryLogger, Q, socketio) {

    var socket = socketio.connect('//localhost:3001');

    var Repository = BackboneRepository.extend({
      _collectionType: TodoList,
      _logger: null,
      _channel: "",

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
      },

      onFetchCollection: function(collection){
        var that = this;
        socket.on('put', function(data){
          var id = data._id;
          var model = that._collection.get(id);
          model.set(data);
        });

        socket.on('post', function(data){
          var model = new that._collection.model(data);
          that._collection.add(model);
        });

        socket.on('delete', function(data){
          var id = data._id;
          var model = that._collection.get(id);
          model.trigger('destroy', model, model.collection);
        });
      },

      onAdd: function(model){
        socket.emit('post', model.toJSON());
      },

      onUpdate: function(model){
        socket.emit('put', model.toJSON());
      },

      onRemove: function(model){
        socket.emit('delete', model.toJSON());
      }

    });

    return Repository;
  });