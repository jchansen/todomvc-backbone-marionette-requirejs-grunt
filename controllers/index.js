// Other organization alternatives:
// This one (towards the bottom) offers a suggestions on keeping routes and controllers
// separate but providing a cleaner integration
// http://stackoverflow.com/questions/5778245/expressjs-how-to-structure-an-application
//
// This one has something like the routes.rb file in Rails
// http://stackoverflow.com/questions/9832019/how-to-organize-large-node-js-projects

module.exports.setup = function(app){
  require('./HomeController').setup(app);
  require('./LoginController').setup(app);
  require('./AuthController').setup(app);
};