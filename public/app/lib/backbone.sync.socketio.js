(function (root, factory) {
  if (typeof exports === 'object') {

    var backbone = require('backbone');
    var q = require('q');
    var io = require('socket.io');
    module.exports = factory(backbone, q, io);

  } else if (typeof define === 'function' && define.amd) {

    define(['backbone', 'q', 'socket.io'], factory);

  }
}(this, function (Backbone, Q, io) {

  var originalSync = Backbone.sync;

  var socket = io.connect('//localhost:3001');
  socket.on('test', function(data){
    console.log("got test message!");
  });

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  Backbone.sync = function (method, model, options) {
    "use strict";

    var type = methodMap[method];

    options = options || {};

    var params = {type: type, data: {}};

    if (options.data == null && model && (method === 'create' || method === 'update')) {
      //params.data = JSON.stringify(options.attrs || model.toJSON(options));
      params.data = options.attrs || model.toJSON(options);
    }

    var defer = Q.defer();

    var model = this;
    if(type === 'GET'){
      socket.emit('get', params.data);
      socket.on('get', function(resp){
        //options.success(data);

        model.set(model.parse(resp, options), options);
        model.trigger('sync', model, resp, options);

        defer.resolve(data);
      });

    }else if(type === 'POST'){
      socket.emit('post', params.data);
      var model = this;
      socket.on('post', function(data){
        //options.success(data);

        model.set(model.parse(resp, options), options);
        model.trigger('sync', model, resp, options);

        defer.resolve(data);
      });

    }else if(type === 'PUT'){
      socket.emit('put', params.data);
      socket.on('put', function(data){
        options.success(data);

        model.set(model.parse(resp, options), options);
        model.trigger('sync', model, resp, options);

        defer.resolve(data);
      });

    }else if(type === 'DELETE'){
      params.data[model.idAttribute] = model.id;
      socket.emit('delete', params.data);

      var model = this;
      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      socket.on('delete', function(data){
        options.success(data);


        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);

        defer.resolve(data);
      });

    }else{
      throw new Error("unsupported type: " + type);
    }

    var promise = defer.promise;
    model.trigger('request', model, promise, options);
    return promise;

    // Don't process data on a non-GET request.
    //if (params.type !== 'GET') {
    //  params.processData = false;
    //}

    //_.extend(params, options);
  };

  return Backbone.sync;
}));
