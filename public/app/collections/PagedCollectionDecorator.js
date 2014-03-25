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

      defaultConfig: {
        resultsPerPage: Number.MAX_VALUE
      },
      configName: 'pagingConfig',

      setPagingConfig: function(options){
        options = options || {};
        var config = options[this.configName] || {};
        var _config = this._config;
        var _collection = this._collection;

        _.extend(_config, config);
        _config.totalItems = _collection.length;
        _config.totalPages = Math.ceil(_config.totalItems / _config.resultsPerPage);
        if(_config.currentPage < 1 || !_config.currentPage) _config.currentPage = 1;
        _config.currentPage = _config.currentPage > _config.totalPages ? _config.totalPages : _config.currentPage;
      },

      execute: function(options){
        var skip, take, result = null;
        this.setPagingConfig(options);
        var _pagingConfig = this._config;
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
