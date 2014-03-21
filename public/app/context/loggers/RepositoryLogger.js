define(
  [
    'backbone',
    'logger',
    'underscore'
  ],
  function (Backbone, logger, _) {

    var Repository = Backbone.Marionette.Controller.extend({

      _plural: null,
      _singular: null,

      initialize: function(options){
        _.bindAll(this,
          'onFetchCollection',
          'onFetchCollectionError',
          'onAdd',
          'onAddError',
          'onRemove'
        );

        this._plural = options.plural;
        this._singular = options.singular;
        this._repository = options.repository;
        var repo = this._repository;

        // bind to the events we want to listen to
        repo.on("fetch", this.onFetch);
        repo.on("fetch:error", this.onFetchError);
        repo.on("add", this.onAdd);
        repo.on("add:error", this.onAddError);
        repo.on("remove", this.onRemove);
      },

      // collection logs
      onFetchCollection: function (collection) {
        var count = collection.length;
        logger.success(count + " " + this._plural + " fetched!");
      },

      onFetchCollectionError: function () {
        logger.error("problem fetching " + this._plural);
      },

      // model logs
      onFetchModel: function (model) {
        var name = model.get('name');
        logger.success(name + " " + this._singular + " fetched!");
      },

      onFetchModelError: function () {
        logger.error("problem fetching " + this._singular);
      },

      // add logs
      onAdd: function (model) {
        var name = model.get('name');
        logger.success(name + " " + this._singular + " saved and added!");
      },

      onAddError: function () {
        logger.error("error saving " + this._singular);
      },

      onRemove: function () {
        logger.success(this._singular + " destroyed");
      }

    });

    return Repository;
  });

