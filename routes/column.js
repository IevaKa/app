const express = require('express');
const router = express.Router();
const Column = require('../models/Column');


router.get('/', (req, res) => {
  Column.find()
    .then(columns => {
      res.status(200).json(columns);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post('/', (req, res) => {
  const { id, title } = req.body;
  Column.create({
    id, 
    title
  })
    .then(column => {
      res.json(column)
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;