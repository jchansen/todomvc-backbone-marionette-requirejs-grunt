/*global define */

define(
  [
    'backbone',
    'underscore'
  ],
  function (Backbone, _) {
    'use strict';

    var _collection = null;
    var _pagingConfig = {
      resultsPerPage: Number.MAX_VALUE,
      currentPage: 1,
      totalPages: 1
    };
    var _pagingInfo = null;

    return Backbone.Collection.extend({
      initialize: function(models, options){
        _collection = options.collection;
        //this.listenTo(_cache, "all", this.onCollectionUpdated, this);
        options = _.extend({silent: true}, options);
        options.pagingConfig = options.pagingConfig || {};
        _.defaults(options.pagingConfig, _pagingConfig);

        this.reset(_collection.models, options);
        this.execute(options);
      },

      onCollectionUpdated: function(event){
        this.filterBy(_filter);
      },

      setPagingConfig: function(options){
        var pagingConfig = options.pagingConfig || {};
        _.extend(_pagingConfig, pagingConfig);
        _pagingConfig.totalItems = _collection.length;
        _pagingConfig.totalPages = Math.ceil(_pagingConfig.totalItems / _pagingConfig.resultsPerPage);
        if(_pagingConfig.currentPage < 1) _pagingConfig.currentPage = 1;
        _pagingConfig.currentPage = _pagingConfig.currentPage > _pagingConfig.currentPage ? _pagingConfig.totalPages : _pagingConfig.currentPage;
      },

      execute: function(options){
        var skip, take, result = null;
        this.setPagingConfig(options);
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
