var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors');

// Importar controladores de rutas
var routes = require('./routes/index');
var users = require('./routes/users');
var Tasks=require('./routes/tareas');
var usuariosNl=require('./routes/usuarios_nl');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000);

// Iniciar controladores de rutas
app.use('/', routes);
app.use('/users', users);
app.use('/Tasks',Tasks);
app.use('/usuarios-nl',usuariosNl);

module.exports = app;
