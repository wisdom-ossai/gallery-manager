const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const errorHandler = require('errorhandler');
const logger = require('morgan');
const express = require('express');
const routes = require('../routes');
const moment = require('moment');

module.exports = app => {
  app.engine(
    'handlebars',
    exphbs.create({
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
  app.use(
    bodyParser({
      uploadDir: path.join(__dirname, '../public/upload/temp')
    })
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride());
  app.use(cookieParser());
  routes.initialize(app, new express.Router());
  app.use(express.static('public'));
  if ('development' == app.get('env')) {
    app.use(errorHandler());
  }

  return app;
};
