const express = require('express');
const Ticket = require('../models/Ticket');
const Column = require('../models/Column');
const router = express.Router();

// router.get('/:id', (req, res) => {
//   const id = req.params.id;

//   Ticket.findById(id)
//     .then(task => {
//       res.status(200).json(task);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });
router.get('/', (req, res) => {
  Ticket.find({ createdBy: req.user.id })
  // .populate('assignee')
  // .populate('createdBy')
    .then(tickets => {
      res.status(200).json(tickets);
    })
    .catch(err => {
      res.json(err);0
    });
});


router.post('/', (req, res) => {
  const { lab, title, description, status } = req.body;
  Ticket.create({
    createdBy: req.user.id,
    lab : lab, 
    title : title, 
    description : description, 
    status : status
  })
    .then(task => {
      Column.update(
        { user: req.user.id }, 
        { $push: { columnOpen: task._id } },
    ).then(column => {
      console.log('column is updated ', column)
    })
      res.json(task)
    })
    .catch(err => {
      console.log('catch:', err)
      res.json(err);
    });
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const status = req.body;
  Ticket.findByIdAndUpdate(id, status, { new: true })
    .then(ticket => {
      res.json(ticket);
    })
    .catch(err => {
      res.json(err);
    });
});

// router.delete('/:id', (req, res, next) => {
//   const id = req.params.id;

//   Task.findByIdAndDelete(id)
//     .then(task => {
//       return Project.findByIdAndUpdate(task.project, {
//         $pull: { tasks: id }
//       }).then(() => {
//         res.json({ message: 'ok' });
//       });
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

module.exports = router;