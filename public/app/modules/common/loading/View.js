define(
  [
    'marionette',
    'tpl!./template.html',
    'spin'
  ],
  function (Marionette, template, Spinner) {

    return Marionette.ItemView.extend({
      template: template,

      onShow: function () {
        this.spinner = new Spinner()
        var spinnerEl = this.$('.spinner')[0];
        this.spinner.spin(spinnerEl);
      },

      onClose: function () {
        this.spinner.stop();
      }
    });
  });