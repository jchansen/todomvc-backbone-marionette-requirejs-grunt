define(
  [
    'marionette',
    'tpl!./layout.html'
  ],
  function (Marionette, template) {

    return Marionette.Layout.extend({
      template: template,

      regions: {
        listRegion: '#listRegion',
        filterRegion: '#filterRegion'
      },

      initialize: function (options) {
        this.listenTo(this.collection, 'all', this.updateVisibility);
      },

      onRender: function () {
        this.updateVisibility();
      },

      updateVisibility: function () {
        this.$el.toggle(this.collection.length > 0);
      }

    });
  });