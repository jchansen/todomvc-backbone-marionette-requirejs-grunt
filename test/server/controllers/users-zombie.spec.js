var expect = require("chai").expect;
var request = require("request");
var Browser = require("zombie");

describe("Account creation", function(){

  var browser = null;
  before(function(){
    browser = new Browser({
      site: 'http://localhost:3000',
      addJQuery: false
    });
  });

  describe("GET /register", function(){

    beforeEach(function(done){
      browser.visit('/register', function() {
        done();
      });
    });

    it("should have a form on the page", function(done){
      var result = browser.query('form');
      var formGroups = browser.queryAll('.form-group');
      for(var i = 0; i < formGroups.length; i++){
        var formGroup = formGroups[i];
        expect(formGroup)
      }
      console.log(browser.html());
      browser.html("", function(a,b,c){
        done();
      });

    });

  });

});

// http://redotheweb.com/2013/01/15/functional-testing-for-nodejs-using-mocha-and-zombie-js.html