const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const errorHandler = require('errorhandler');
const logger = require('morgan');
const express = require('express');
const routes = require('../routes');
const moment = require('moment');
const toastr = require('express-toastr');

module.exports = app => {
  app.engine(
    'handlebars',
    exphbs.create({
      defaultLayout: 'main',
      layoutsDir: app.get('views') + '/layouts',
      partialsDir: [app.get('views') + '/partials'],
      helpers: {
        timeago: timestamp => {
          return moment(timestamp)
            .startOf('minute')
            .fromNow();
        }
      }
    }).engine
  );

  app.set('view engine', 'handlebars');

  app.use(logger('dev'));
  // app.use()
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(
    session({
      secret: 'secret',
      saveUninitialized: true,
      resave: true
    })
  );
  app.use(flash());
  routes.initialize(app, new express.Router());
  app.use(express.static('public'));
  app.use(toastr());
  if ('development' == app.get('env')) {
    app.use(errorHandler());
  }

  return app;
};
