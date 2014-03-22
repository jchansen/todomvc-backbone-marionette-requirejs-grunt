/*global define */

define(
  [
    'marionette',
    'tpl!./paging.html'
  ],
  function (Marionette, template) {
    'use strict';

    return Marionette.ItemView.extend({
      template: template,

      ui: {
        //pages: '.filters a',
        pages: 'ul.filters'
      },

      events: {
        'click .filters a': 'onPageSelected'
      },

      initialize: function(options){
        var self = this;
        this.listenTo(this.collection, 'all', this.updateVisibility, this);
        this.listenTo(this.collection, 'all', this.updatePage, this);

        // update paging options with filtered collection
        app.vent.on('todoList:filter', function (filter) {
          var completed = filter === "active" ? false : true;
          self.collection.filterBy(function(model){
            var status = model.get('completed');
            if(filter === "") return true;
            return status === completed;
          });
        });

        app.vent.on("todoList:page", function(pageNumber){
          self.collection.page({currentPage: pageNumber});
        });
      },

      onPageSelected: function(e,a,b,c){
        e.preventDefault();
        var pageNumber = Number(e.target.getAttribute('href').substring(5));
        app.vent.trigger("todoList:page", pageNumber);
      },

      onRender: function () {
        this.updatePage();
        this.updateVisibility();
      },

      updateVisibility: function(){
        this.$el.toggle(this.collection.length > 0);
      },

      updatePage: function(){
        var pagingInfo = this.collection.pagingInfo();
        var totalPages = pagingInfo.totalPages;
        var currentPage = pagingInfo.currentPage;
        this.ui.pages.empty();
        for(var i = 1; i <= totalPages; i++){
          // <li><a href="#page1">1</a></li>
          this.ui.pages.append('<li><a href="#page' + i + '">' + i + '</a></li>')
        }
        this.$('.filters a')
          .removeClass('selected')
          .filter('[href="' + '#page' + currentPage + '"]')
          .addClass('selected');
      }
    });
  });
