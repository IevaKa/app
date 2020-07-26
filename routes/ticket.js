const express = require('express');
const Ticket = require('../models/Ticket');
const Column = require('../models/Column');
const User = require('../models/User');
const router = express.Router();

router.get('/:id', (req, res) => {
  const id = req.params.id;

  Ticket.findById(id)
    .populate('createdBy')
    .then(ticket => {
      res.status(200).json(ticket);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/', (req, res) => {
  Ticket.find({ createdBy: req.user.id })
    // .populate('assignee')
    // .populate('createdBy')
    .then(tickets => {
      res.status(200).json(tickets);
    })
    .catch(err => {
      res.json(err); 0
    });
});


router.post('/', (req, res) => {
  console.log(req.body)
  const { lab, title, description, status } = req.body;
  Ticket.create({
    createdBy: req.user.id,
    lab: lab,
    title: title,
    description: description,
    status: status
  })
    .then(task => {
      const query = { $or:[ { user: req.user.id }, { role : 'Teacher' } ] }
      const fields = { $push: { columnOpen: task._id } }
      Column.updateMany(
        query,
        fields
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
  const { status, destination, source, sourceArray, destinationArray } = req.body;
  Ticket.findByIdAndUpdate(id, { status: status }, { new: true })
    .then(ticket => {
      res.json(ticket);
      console.log('this is the updated ticket: ', ticket)
    })
    .catch(err => {
      res.json(err);
    });

// shiftin things betwwen columns
// user is a student
  Column.update(
    { user: req.user.id },
    { [destination]: destinationArray, [source]: sourceArray },
    { new: true }
  ).then(up => {
    console.log('this is the updated column: ', up)
  })

// student changes stuff, adjust view for teacher
  Column.updateMany(
    { role: 'Teacher' },
    { $pull: { [source]: id  }, $push: { [destination]: id  } }
    ).then(col => {
      console.log('this is the updated teacher columns: ', col)
    })
    
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