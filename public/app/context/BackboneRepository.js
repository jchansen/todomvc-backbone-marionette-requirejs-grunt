define(
  [
    'backbone',
    'marionette'
  ],
  function (Backbone, Marionette) {

    var Repository = Marionette.Controller.extend({

      _collection: null,
      _collectionType: null,
      _promise: null,
      _queryMap: {},

      initialize: function (options) {
        var that = this;
        this._collection = new this._collectionType();
        this._fetchCollection();
        //setInterval(function () {
        //    that._fetchCollection();
        //}, 5000);

      },

      // GET
      _fetchCollection: function () {
        var that = this;
        var promise = this._collection.fetch();
        promise.done(function (collection, response, options) {
          that.triggerMethod("fetch:collection", that._collection);
          that.triggerMethod("cache:updated", that);
        });
        promise.fail(function () {
          that.triggerMethod("fetch:collection:error");
        });
        this._promise = promise;
      },

      getAll: function (options) {
        var that = this;
        options || (options = {});
        var deferred = $.Deferred();

        if (options.forceFetch) this._fetchCollection();

        this._promise.done(function () {
          deferred.resolve(that._collection);
        });

        return deferred.promise();
      },

      // TODO: should this fetch from server?  Then the act of getting a model
      //       by id means you have the detailed version of it.
      getById: function (id, options) {
        var that = this;
        var deferred = $.Deferred();
        this._promise.done(function (model, response, options) {
          var model = that._collection.get(id);
          if (model === null) throw "No model found with given id";
          that._fetchModel(model, function(){
            deferred.resolve(model);
          });
        }, this);
        return deferred.promise();
      },

      _fetchModel: function(model, callback){
        var that = this;
        var promise = model.fetch();
        promise.done(function () {
          that.triggerMethod("fetch:model", model);
          callback(model);
        });
        promise.fail(function () {
          that.triggerMethod("fetch:model:error");
        });
      },

      getCollectionById: function (id, fieldName) {
        var deferred = $.Deferred();

        var promise = this.getById(id);
        promise.done(function (entity) {
          if (this._fieldsMap === null)
            throw "No fields in _fieldMap. Must define valid fields before calling getCollectionById";

          // TODO: there is an assumption here that the field is an array
          //       but still need to check for it.
          var arrayField = entity.get(fieldName);
          if (arrayField === undefined)
            throw "Entity does not have field " + fieldName;

          var map = this._fieldsMap[fieldName];
          if (map === undefined)
            throw "No map defined for field " + fieldName;

          if (map[id] === undefined) {
            map[id] = new Backbone.Collection(arrayField);
          }

          deferred.resolve(map[id]);
        });

        return deferred.promise();
      },

      add: function (model) {
        var that = this;
        var promise = model.save();
        promise.done(function (resp, b, c) {
          that._collection.add(model);
          that.triggerMethod("add", model);
          that.triggerMethod("cache:updated", that);
        });
        promise.fail(function () {
          that.triggerMethod("addError");
        });
      },

      update: function(model){
        var deferred = $.Deferred();
        this._update(model, function(result){
          deferred.resolve(result);
        });
        return deferred.promise();
      },

      _update: function(model, callback){
        var that = this;
        var promise = model.save();
        promise.done(function(resp, b, c){
          that.triggerMethod("update", model);
          callback(model);
        });
        promise.fail(function () {
          that.triggerMethod("update:error");
        });
      },

      where: function(options){
        var that = this;
        var deferred = $.Deferred();
        this._where(options, function(result){
          deferred.resolve(result);
        });
        return deferred.promise();
      },

      _where: function(query, callback){
        var that = this;
        var promise = this.getAll();
        promise.done(function(collection){
          var result = collection.where(query);
          var response = new that._collectionType(result);
          response.queryId = _.uniqueId('query');

          // map the auto-generated id of this collection to the query that generated it
          // this will let us update the collection later
          that._queryMap[response.queryId] = query;
          response.listenTo(that, "cache:updated", that.updateCollection, response);
          callback(response);
        });
      },

      whereCollectionProvided: function (options, collection) {
        var that = this;
        var deferred = $.Deferred();
        this._whereCollectionProvided(options, function (result) {
          deferred.resolve(result);
        });
        return deferred.promise();
      },

      _whereCollectionProvided: function (options, callback) {
        var query = options.query;
        var _collection = options.collection;

        var that = this;
        var promise = this.getAll();
        promise.done(function (collection) {
          var result = collection.where(query);
          _collection.set(result);
          _collection.queryId = _.uniqueId('query');

          // map the auto-generated id of this collection to the query that generated it
          // this will let us update the collection later
          that._queryMap[_collection.queryId] = query;
          _collection.listenTo(that, "cache:updated", that.updateCollection, _collection);
          callback(_collection);
        });
      },

      updateCollection: function(repository){
        var collection = repository._collection;
        var query = repository._queryMap[this.queryId];
        var result = collection.where(query);
        this.set(result);
      },

      remove: function (model) {
        var that = this;
        var deferred = $.Deferred();
        this._remove(model, function (result) {
          that.triggerMethod("remove", result);
          deferred.resolve(result);
        });
        return deferred.promise();
      },

      _remove: function (model, callback) {
        var that = this;
        var promise = model.destroy();
        promise.done(function (resp, b, c) {
          that.triggerMethod("cache:updated", that);
          callback(model);
        });
        promise.fail(function () {
          that.triggerMethod("remove:error");
        });
      }

    });

    return Repository;
  });

