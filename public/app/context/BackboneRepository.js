define(
  [
    'backbone',
    'marionette',
    'collections/FilteredCollection'
  ],
  function (Backbone, Marionette, FilteredCollection) {

    var Repository = Marionette.Controller.extend({

      _collection: null,
      _collectionType: null,
      _promise: null,

      initialize: function (options) {
        var that = this;
        this._collection = new this._collectionType();
        this._fetchCollection();
      },

      // GET
      _fetchCollection: function () {
        var that = this;
        var promise = this._collection.fetch();
        promise.done(function (collection, response, options) {
          that.triggerMethod("fetch:collection", that._collection);
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
          var filteredCollection = new FilteredCollection(null, {cache: that._collection});
          deferred.resolve(filteredCollection);
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

      add: function (model) {
        var that = this;
        var promise = model.save();
        promise.done(function (resp, b, c) {
          that._collection.add(model);
          that.triggerMethod("add", model);
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
          callback(model);
        });
        promise.fail(function () {
          that.triggerMethod("remove:error");
        });
      }

    });

    return Repository;
  });

