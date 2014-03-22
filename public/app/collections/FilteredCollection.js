/*global define */

define(
  [
    'backbone'
  ],
  function (Backbone) {
    'use strict';

    var _cache = null;
    var _filter = function(model){
      return true;
    };
    var _filteredModels = null;
    var _defaultPagingInfo = {
      resultsPerPage: 4,//Number.MAX_VALUE,
      currentPage: 1,
      totalPages: 1
    };
    var _pagingInfo = null;

    return Backbone.Collection.extend({
      initialize: function(models, options){
        _cache = options.cache;
        options = options || {};
        this.filterBy(options.filter || _filter, _.extend({silent: true}, options));
        this.listenTo(_cache, "all", this.onCacheUpdated, this);
      },

      onCacheUpdated: function(event){
        this.filterBy(_filter);
      },

      filterBy: function(filter, options){
        _filter = filter || _filter;
        _filteredModels = _cache.filter(_filter);
        this.reset(_filteredModels, options);
        this._calculateAndSetPagingInfo();
        this.page();
        return this;
      },

      _calculateAndSetPagingInfo: function(){
        var totalItems = _filteredModels.length;
        var totalPages = Math.ceil(totalItems / _defaultPagingInfo.resultsPerPage);
        _pagingInfo = _.defaults({
          totalItems: totalItems,
          totalPages: totalPages
        }, _defaultPagingInfo);
      },

      page: function(options){
        var defaults = _.clone(_pagingInfo);
        var pagingInfo = _.clone(options || {});
        _pagingInfo = _.defaults(pagingInfo, defaults);

        var skip = (pagingInfo.currentPage - 1)*pagingInfo.resultsPerPage;
        var take = pagingInfo.resultsPerPage;
        var result = _.chain(_filteredModels)
                      .rest(skip)
                      .first(take || _filteredModels.length - skip)
                      .value();
        this.reset(result);
      },

      pagingInfo: function(){
        return _.clone(_pagingInfo);
      },

      // todo: move into FilteredTodoList class
      getCompleted: function () {
        return _cache.getCompleted();
      },

      getActive: function () {
        return _cache.getActive();
      }
    });
  });
