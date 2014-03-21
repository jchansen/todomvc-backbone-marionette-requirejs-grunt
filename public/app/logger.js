define(
  [
    'toastr'
  ],
  function (toastr) {

    toastr.options = {
      "timeOut": "1000",
      "extendedTimeOut": "1000"
    }

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