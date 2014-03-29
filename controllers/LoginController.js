module.exports.setup = function(app){
  app.get('/login', function(req, res){
    res.render('login', { user: req.user });
  });
};