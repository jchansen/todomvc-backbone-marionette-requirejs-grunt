/*global define */

define(
  [
    // routers and controllers
    'routers/index',

    // commands
    'commands/todos'
  ],
  function () {
    'use strict';

    return {
      run: function(){
//        app.vent.on('todoList:clear:completed', function () {
//          todoList.getCompleted().forEach(function (todo) {
//            todo.destroy();
//          });
//        });

        app.start();
      }
    }

  });
