var expect = require("chai").expect;
var request = require("request");
var app = require("../../app");
var cheerio = require("cheerio");

describe("Account creation", function(){
  describe("GET /register", function(){
    var body = null;
    before(function(done){
      var options = {uri: "http://localhost:3000/register"};
      request(options, function(err, response, _body){
        body = _body;
        done();
      });
    });

    it("should have a form on the page", function(){
      var $ = cheerio.load(body);
      expect($('form').length).to.equal(1);
    });

    it("should have form fields", function(){
      var $ = cheerio.load(body);
      expect($('.form-group').length).to.equal(5);
    });
  });

});