module.exports.setup = function(app){
  app.get('/', function(req, res){
    res.render('index', { title: 'Express' });
  });
};