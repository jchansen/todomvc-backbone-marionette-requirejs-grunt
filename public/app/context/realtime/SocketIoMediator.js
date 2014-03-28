define(
  [
    'marionette',
    'socket.io'
  ],
  function (Marionette, socketio) {

    var Mediator = Marionette.Controller.extend({

      initialize: function(options){
        this.repository = options.repository;
        this.url = options.url;
        this.channel = options.channel;
        this.socket = socketio.connect(this.url + this.channel);

        // bind to the events we want to listen to
        this.listenTo(this.repository, "add", this.onAdd, this);
        this.listenTo(this.repository, "update", this.onUpdate, this);
        this.listenTo(this.repository, "remove", this.onRemove, this);

        // starting listening for updates
        this.registerCallbacks();
      },

      registerCallbacks: function(collection){
        var that = this;
        this.repository.getAll().done(function(collection){
          that.socket.on('put', function(data){
            var id = data._id;
            var model = collection.get(id);
            model.set(data);
          });

          that.socket.on('post', function(data){
            var model = new collection.model(data);
            collection.add(model);
          });

          that.socket.on('delete', function(data){
            var id = data._id;
            var model = collection.get(id);
            model.trigger('destroy', model, model.collection);
          });
        });
      },

      onAdd: function(model){
        this.socket.emit('post', model.toJSON());
      },

      onUpdate: function(model){
        this.socket.emit('put', model.toJSON());
      },

      onRemove: function(model){
        this.socket.emit('delete', model.toJSON());
      }

    });

    return Mediator;
  });

