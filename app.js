require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
// const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');


mongoose
  .connect('mongodb://localhost/ticketing_app', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();
const session = require('express-session');
const passport = require('passport');
const User = require('./models/User');

require('./configs/passport');

const MongoStore = require('connect-mongo')(session);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
// app.set('view engine', 'hbs');

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// Github Social Login
const GitHubStrategy = require('passport-github').Strategy

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: 'http://localhost:5555/auth/github/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ githubId: profile.id })
        .them(found => {
          if (found !== null) {
            done(null, found);
          } else {
            return User.create({ githubId: profile.id }).then(dbUser => {
              done(null, dbUser);
            })
          }
        })
        .catch(err => {
          done(err);
        })
    }
  )
)



app.use('/api/tickets', require('./routes/ticket'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/columns', require('./routes/columns'));

module.exports = app;