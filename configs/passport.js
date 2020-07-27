const User = require('../models/User');
const Column = require('../models/Column');
const Ticket = require('../models/Ticket');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});

passport.use(
  new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, foundUser) => {
      if (err) {
        next(err);
        return;
      }

      if (!foundUser) {
        next(null, false, { message: 'Incorrect username.' });
        return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        next(null, false, { message: 'Incorrect password.' });
        return;
      }

      next(null, foundUser);
    });
  })
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: 'http://localhost:5555/api/auth/github/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile)
      User.findOne({ githubId: profile.id })
        .then(found => {
          if (found !== null) {
            done(null, found);
          } else {
            return User.create({
              githubId: profile.id,
              username: profile.username,
              location: profile._json.location,
              image: profile._json.avatar_url,
              name: profile.displayName,
              bio: profile._json.bio,
              role: 'Student'
            }).then(dbUser => {
              const openTickets = Ticket.find({ status: 'Opened' }).map(ticket => ticket._id)
              console.log('First open tickets', openTickets)
              if(dbUser.role === 'Student') openTickets = [];
              console.log('Second open tickets', openTickets)

              Ticket.find({ status: 'Opened' }).then(tickets => {
                let openTickets = [];
                if(dbUser.role === 'Teacher') openTickets = tickets.map(ticket => ticket._id);
                Column.create({ user: dbUser._id, role: dbUser.role, columnOpen: openTickets }).then(column => {
                  if (err) {
                    return res
                      .status(500)
                      .json({ message: 'Error while creating the board' });
                  }
                })
              })
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