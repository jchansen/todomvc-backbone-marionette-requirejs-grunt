define(
  [
    'backbone',
    'marionette',
    'conductor',
    'underscore',
    'q',
    'modules/banner/Module'
  ],
  function (Backbone, Marionette, Conductor, _, Q, Module) {

    describe("Real Time Use Cases", function(){
      "use strict";

      describe("user actions", function(){

        describe("for collections", function() {

          describe("fetch all models", function () {
            it("should use the normal API")
            it("should bring socket.io online after the first fetch")
          });

        });

        describe("on single model", function() {

          describe("fetch single model", function () {
            // use case: user wants to expand information for a model
            // returned in the collection
            it("should use the normal API")
          });

          describe("create a model", function () {
            it("should emit the model")
          });

          describe("update a model", function () {
            it("should emit the model")
          });

          describe("delete a model", function () {
            it("should emit the model")
          });

        });

      });

      describe("actions performed by someone else", function(){

        describe("create a model", function () {
          it("collection should add model to the list")
        });

        describe("update a model", function () {
          it("collection should update corresponding model")
        });

        describe("delete a model", function () {
          it("collection should delete the model")
        });

      });

    });
  }
);
