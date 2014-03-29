/*global define */

define(
  [
    'marionette',
    'tpl!./template.html',
    'oauth',
    'collections/GitHubUsers',
    './ItemView',
    'bacon'
  ],
  function (Marionette, template, OAuth, GitHubUsers, UserItemView, Bacon) {
    'use strict';

    return Marionette.CompositeView.extend({
      template: template,
      itemView: UserItemView,

      initialize: function(options){
        //http://localhost:3000/OAuth.initialize('zPNdXMAlrzo5cJXLmHLYM5Q7UMQ');
        this.collection = new GitHubUsers();
        this.collection.fetch({
          //url: "https://api.github.com/search/users?q=jason hansen&client_id=03d93a0ae23a3c61116e&client_secret=539e52e3a74a24acdde99f16fac5bdf8e2c128fb",
          url: "https://api.github.com/search/users",
          data: {
            q: 'jason hansen',
            client_id: '03d93a0ae23a3c61116e',
            client_secret: '539e52e3a74a24acdde99f16fac5bdf8e2c128fb'
          },
          beforeSend: function(xhr) {
            xhr.setRequestHeader('Accept', 'application/vnd.github.v3.text-match+json');
          }
        }).done(function(a,b,c){
          console.log(a);
        });
      },

      onRender: function(){
        var that = this;
//        OAuth.popup('github', function(err, result) {
//          //handle error with err
//          //use result.access_token in your API request
//          console.log(err);
//          console.log(result);
//          result.get('/users').done(function(data,a,b){
//            console.log(data);
//          })
//        });

        function ajaxStream(query){
          return Bacon.fromCallback(function(callback){

          })
        }

        this.$('input')
          .asEventStream("keyup")
          .map(function(event) {
            return event.target.value;
          })
          .debounce(300)
          .filter(function(value){
            return value !== "";
          })
          .onValue(function(text){
            console.log(text);

            that.collection.fetch({
              //url: "https://api.github.com/search/users?q=jason hansen&client_id=03d93a0ae23a3c61116e&client_secret=539e52e3a74a24acdde99f16fac5bdf8e2c128fb",
              url: "https://api.github.com/search/users",
              data: {
                q: text,
                client_id: '03d93a0ae23a3c61116e',
                client_secret: '539e52e3a74a24acdde99f16fac5bdf8e2c128fb'
              },
              beforeSend: function(xhr) {
                xhr.setRequestHeader('Accept', 'application/vnd.github.v3.text-match+json');
              }
            })
          });
      }
    });
  });
