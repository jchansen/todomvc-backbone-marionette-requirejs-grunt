/*global define */

define(
  [
    'backbone',
    'underscore'
  ],
  function (Backbone, _) {
    'use strict';

    return Backbone.Collection.extend({

      initialize: function(models, options){
        if(!(options.collection instanceof Backbone.Collection)) throw new Error("must pass in collection");
        this._collection = options.collection;
        this._pagingConfig = {
          resultsPerPage: Number.MAX_VALUE
        };
        this.listenTo(this._collection, "all", this.onCollectionUpdated, this);
        options = _.extend({silent: true}, options);
        this.execute(options);
      },

      onCollectionUpdated: function(event){
        this.execute();
      },

      getConfig: function(){
        return {pagingConfig: _.clone(this._pagingConfig)};
      },

      setPagingConfig: function(options){
        options = options || {};
        var pagingConfig = options.pagingConfig || {};
        var _pagingConfig = this._pagingConfig;
        var _collection = this._collection;

        _.extend(_pagingConfig, pagingConfig);
        _pagingConfig.totalItems = _collection.length;
        _pagingConfig.totalPages = Math.ceil(_pagingConfig.totalItems / _pagingConfig.resultsPerPage);
        if(_pagingConfig.currentPage < 1 || !_pagingConfig.currentPage) _pagingConfig.currentPage = 1;
        _pagingConfig.currentPage = _pagingConfig.currentPage > _pagingConfig.totalPages ? _pagingConfig.totalPages : _pagingConfig.currentPage;
      },

      execute: function(options){
        var skip, take, result = null;
        this.setPagingConfig(options);
        var _pagingConfig = this._pagingConfig;
        var _collection = this._collection;

        skip = (_pagingConfig.currentPage - 1)*_pagingConfig.resultsPerPage;
        take = _pagingConfig.resultsPerPage;
        result =  _collection.chain()
                              .rest(skip)
                              .first(take || _collection.length - skip)
                              .first(_pagingConfig.resultsPerPage)
                              .value();
        this.reset(result, options);
      },

      updateConfiguration: function(options){
        this.execute(options);
      },

      setPage: function(pageNumber){
        this.execute({
          pagingConfig: {
            currentPage: pageNumber
          }
        });
      }

    });
  });
