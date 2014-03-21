define(
  [
    'toastr'
  ],
  function (toastr) {

    var logger = {

      success: function (message, title) {
        toastr.success(message, title);
      },

      error: function (message, title) {
        toastr.error(message, title);
      }
    };

    return logger;

  });