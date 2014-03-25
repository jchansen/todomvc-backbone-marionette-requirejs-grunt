/*global define */

define(
  [
    'backbone',
    'underscore',
    './CollectionDecorator'
  ],
  function (Backbone, _, CollectionDecorator) {
    'use strict';

    return CollectionDecorator.extend({

      initialize: function(models, options){
        this._pagingConfig = {
          resultsPerPage: Number.MAX_VALUE
        };
        CollectionDecorator.prototype.initialize.apply(this, [models, options]);
      },

      getConfig: function(){
        var config = {};
        config.pagingConfig = _.clone(this._pagingConfig);
        if(this._collection instanceof CollectionDecorator) _.defaults(config, this._collection.getConfig());
        return config;
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

      setPage: function(pageNumber){
        this.execute({
          pagingConfig: {
            currentPage: pageNumber
          }
        });
      }

    });
  });
