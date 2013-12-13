var express = require('express'),
  routes = require('./routes'),
  path = require('path');

var app = express();
app.set('view engine', 'html');
app.set('layout', 'layout');
app.set('partials', {
  foo: 'foo'
});

app.enable('view cache');
app.engine('html', require('hogan-express'));


app.get('/', function(req, res) {
  res.locals = {
    name: 'Andrew'
  };
  return res.render('template', {
    partials: {
      message: 'message'
    }
  });
});

app.listen('3000');
