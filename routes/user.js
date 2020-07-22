const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/', (req, res) => {
  User.find()
  // .populate('assignee')
  // .populate('createdBy')
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.json(err);0
    });
});

module.exports = router;