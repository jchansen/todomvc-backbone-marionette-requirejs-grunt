/*global define */

define(
  [
    'backbone'
  ],
  function (Backbone) {
    'use strict';

    return Backbone.Collection.extend({
      model: Backbone.Model,
      //url: globals.API_ROOT_URL + "/api/todos",

      parse: function(resp){
        var out = [];
        var items = resp.items;
        for(var i = 0; i < items.length; i++){
          var relevantEntity = false;
          var entity = items[i];
          if(entity.text_matches.length === 0) break;
          for(var j = 0; j < entity.text_matches.length; j++){
            var match = entity.text_matches[j];
            if(match.property === "name"){
              relevantEntity = true;
              entity.name = match.fragment;
            }
          }
          if(relevantEntity == true) out.push(entity);
        }
        return out;
      }

    });
  });
