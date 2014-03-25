define(
  [
    'marionette',
    'logger',
    'underscore'
  ],
  function (Marionette, logger, _) {

    var Repository = Marionette.Controller.extend({

      _plural: null,
      _singular: null,

      initialize: function(options){
        this._plural = options.plural;
        this._singular = options.singular;
        this._repository = options.repository;
        if(typeof(options.description) === "function"){
          this.description = options.description;
        }
        var repo = this._repository;

        // bind to the events we want to listen to
        this.listenTo(repo, "fetch", this.onFetchCollection, this);
        this.listenTo(repo, "fetch:error", this.onFetchCollectionError, this);
        this.listenTo(repo, "add", this.onAdd, this);
        this.listenTo(repo, "add:error", this.onAddError, this);
        this.listenTo(repo, "update", this.onUpdate, this);
        this.listenTo(repo, "remove", this.onRemove, this);
      },

      description: function(model){
        return "";
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
        logger.success(this.description(model) + " " + this._singular + " fetched!");
      },

      onFetchModelError: function () {
        logger.error("problem fetching " + this._singular);
      },

      // add logs
      onAdd: function (model) {
        logger.success(this.description(model) + " " + this._singular + " saved and added!");
      },

      onAddError: function () {
        logger.error("error saving " + this._singular);
      },

      onUpdate: function (model) {
        logger.success(this._singular + " updated (" + this.description(model) + ")");
      },

      onRemove: function () {
        logger.success(this._singular + " destroyed");
      }

    });

    return Repository;
  });

