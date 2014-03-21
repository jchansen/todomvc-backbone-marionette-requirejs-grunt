define(
  [
    'context/BackboneRepository',
    'collections/TodoList',
    'context/loggers/RepositoryLogger',
    'q'
  ],
  function (BackboneRepository, TodoList, RepositoryLogger, Q) {

    var Repository = BackboneRepository.extend({
      _collectionType: TodoList,
      _logger: null,
      isPage: true,

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

      getPage: function(options){
        options = options || {};
        _.defaults(options, {page: 1, pageSize: 5});
        var defer = Q.defer();
        this._getPage(options, function(result){
          defer.resolve(result);
        });
        return defer.promise;
      },

      _getPage: function(options, callback){
        var self = this;
        this.getAll().done(function(todos){
          var skip = (options.page - 1)*options.pageSize;
          var take = options.pageSize;
          var result = self._collection
                            .chain()
                            .rest(skip)
                            .first(take || self._collection.length - skip)
                            .value();
          var response = new self._collectionType(result);
          callback(response);

//          return _(array)
//            .chain()
//            .rest(skip)
//            .first(take || array.length - skip)
//            .value();
        });
      }

    });

    return Repository;
  });