const express = require('express');
const Column = require('../models/Column');
const router = express.Router();

router.get('/', (req, res) => {
  Column.findOne({ user: req.user.id })
  // .populate('columnOpen')
  // .populate('columnProgress')
  // .populate('columnDone')
  // .populate('columnCancelled')
  .then(column => {
      res.status(200).json(column);
    })
    .catch(err => {
      res.json(err);0
    });
});

router.put('/', (req, res) => {
  const { property, array } = req.body;
  Column.update(
    { user: req.user.id }, 
    { [property]: array },
    { new: true }
  ).then(column => {
      res.status(200).json(column);
      console.log('update in the same column: ', column)
    })
    .catch(err => {
      res.json(err);0
    });
});

module.exports = router;