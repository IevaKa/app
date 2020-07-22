const express = require('express');
const Ticket = require('../models/Ticket');
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
  console.log('here get tickets')
    Ticket.find()
    // .populate('assignee')
    // .populate('createdBy')
      .then(tickets => {
        res.status(200).json(tickets);
      })
      .catch(err => {
        res.json(err);
      });
  });

router.post('/', (req, res) => {
  const { lab, title, description, status } = req.body;
  console.log('backend1:', lab, title, description, status)
  Ticket.create({
    lab, 
    title, 
    description, 
    status
  })
    .then(task => {
      console.log('backend2:', task)
      res.json(task)
    })
    .catch(err => {
      console.log('catch:', err)

      res.json(err);
    });
});

// router.put('/:id', (req, res, next) => {
//   const id = req.params.id;
//   const { title, description } = req.body;

//   Task.findByIdAndUpdate(id, { title, description }, { new: true })
//     .then(task => {
//       res.json(task);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

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