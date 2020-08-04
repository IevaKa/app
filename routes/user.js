const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/', (req, res) => {
  User.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.json(err);0
    });
});

router.put('/', (req, res) => {
  const startWeek = req.body.startWeek
  console.log('HERE ', startWeek)
  User.updateMany(
    {}, 
    { "$set" : { "cohortStartWeek": startWeek } }
  )
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.json(err);
    });
});


module.exports = router;