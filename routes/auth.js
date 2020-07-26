const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Ticket = require('../models/Ticket');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Column = require('../models/Column');

router.post('/signup', (req, res) => {
  const { username, password, name, role } = req.body;

  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ message: 'Your password must be 8 char. min.' });
  }
  if (!username) {
    return res.status(400).json({ message: 'Your username cannot be empty' });
  }

  User.findOne({ username: username })
    .then(found => {
      if (found) {
        return res
          .status(400)
          .json({ message: 'This username is already taken' });
      }

      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      return User.create({ username: username, password: hash, name: name, role: role }).then(
        dbUser => {

          req.login(dbUser, err => {
            if (err) {
              return res
                .status(500)
                .json({ message: 'Error while attempting to login' });
            }
            res.json(dbUser);
          });

          Ticket.find({ status: { $in: ['Opened', 'In progress'] } }).then(tickets => {
            console.log('these are the tickets: ', tickets)
            let openArr = tickets.filter(ticket => ticket.status === 'Opened');
            let progressArr = tickets.filter(ticket => ticket.status === 'In progress');
            if(dbUser.role === 'Teacher') {
              openTickets = openArr.map(ticket => ticket._id);
              progressTickets = progressArr.map(ticket => ticket._id);
            } else {
              openTickets = []
              progressTickets = []
            }
            console.log('these are the open: ', openTickets)
            console.log('these are the in progress: ', progressTickets)
            Column.create({ 
              user: dbUser._id, 
              role: dbUser.role, 
              columnOpen: openTickets, 
              columnProgress: progressTickets }).then(column => {
              if (err) {
                return res
                  .status(500)
                  .json({ message: 'Error while creating the board' });
              }
            })
          })

        }
      );
    })
    .catch(err => {
      res.json(err);
    });
  
    
});

router.post('/login', (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error while authenticating' });
    }
    if (!user) {
      return res.status(400).json({ message: 'Wrong credentials' });
    }
    req.login(user, err => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'Error while attempting to login' });
      }
      return res.json(user);
    });
  })(req, res);
});

router.delete('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Successful logout' });
})


router.get('/loggedin', (req, res) => {
  res.json(req.user);
})

router.put('/loggedin/:id', (req, res) => {
  const name = req.body.user;
  // console.log(name)
  User.findByIdAndUpdate(
    req.params.id,
    { name },
    // { new: true } ensures that we are getting the updated document in the .then callback
    { new: true }
  )
    .then(user => {
      console.log(user)
      res.status(200).json(user);
    })
    .catch(err => {
      res.json(err);
    });
});

// Social Login
router.get('/github', passport.authenticate('github'));

router.get(
  '/github/callback',
  passport.authenticate('github', {
    // successRedirect: '/ticket/board',
    successRedirect: 'http://localhost:3000/ticket/board',
    failureRedirect: '/',
  })
);

module.exports = router;