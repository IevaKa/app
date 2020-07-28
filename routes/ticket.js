const express = require('express');
const Ticket = require('../models/Ticket');
const Column = require('../models/Column');
const User = require('../models/User');
const router = express.Router();

router.get('/:id', (req, res) => {
  const id = req.params.id;

  Ticket.findById(id)
    .populate('createdBy')
    .populate('assignee')
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
  const { status, destination, source, sourceArray, destinationArray, timestamp } = req.body;

  // shiftin things between columns
  // updating the order for your own board
  Column.update(
    { user: req.user.id },
    { [destination]: destinationArray, [source]: sourceArray },
    { new: true }
  ).then(up => {
    console.log('this is the updated column: ', up)
  })

  // updating the order for OTHER teachers
  if(destination !== "columnOpen" && source === "columnOpen") {
    Column.updateMany(
      { role: 'Teacher', user: { "$ne": req.user.id } },
      { $pull: { "columnOpen": id  } }
      ).then(col => {
        console.log('remove assign tickets for other teachers ', col)
      })
  } else if(destination === "columnOpen" && source !== "columnOpen") {
    Column.updateMany(
      { role: 'Teacher', user: { "$ne": req.user.id } },
      { $push: { "columnOpen": id  } }
      ).then(col => {
        console.log('remove assign tickets for other teachers ', col)
      }) 
      
      Ticket.findByIdAndUpdate(id, { $unset : { assignee : 1, assignedAt: 1} }, { new: true })
      .then(ticket => {
        console.log('ticket unassigned', ticket)
        // find the student's document
        Column.findOneAndUpdate(
          { user: ticket.createdBy}, 
          { $pull: { [source]: id  }, $push: { [destination]: id  } }
          ).then(col => {
            res.json(ticket);
          }).catch(err => {
            res.json(err);
          });
      })
  }

  // finding the user first, since they will have different actions
  // they can take
  User.findById(req.user.id).then(user => {
    if(user.role === "Student") {
  // updating the state of the tickets
      Ticket.findByIdAndUpdate(id, { status: status, [timestamp]: Date.now() }, { new: true })
        .then(ticket => {
          Column.updateOne(
            { user: ticket.assignee }, 
            { $pull: { [source]: id  }, $push: { [destination]: id  } }
          ).then(col => {
            res.json(col);
            console.log('column for TA assigned: ', col)
          }).catch(err => {
            res.json(err);
          });
        })

    } else if(user.role === "Teacher" && status !== 'Opened') {
        Ticket.findByIdAndUpdate(id, { status: status, assignee: req.user.id, [timestamp]: Date.now() }, { new: true })
          .then(ticket => {
            console.log('this is the assigned ticket ', ticket)
            // find the student's document
            Column.findOneAndUpdate(
              { user: ticket.createdBy}, 
              { $pull: { [source]: id  }, $push: { [destination]: id  } }
              ).then(col => {
                res.json(ticket);
              }).catch(err => {
                res.json(err);
              });
          })
    }
  })   
});

  router.put('/assignment/:id', (req, res, next) => {
    const id = req.params.id;
    // update the ticket document
    Ticket.findByIdAndUpdate(id, { status: 'In progress', assignee: req.user.id, assignedAt: Date.now() })
    .then(ticket => {
      console.log('this is the ticket: ', ticket)
      if(!ticket.assignee) {
      Column.updateMany({ user: { $in: [req.user.id, ticket.createdBy ] } }, { $pull: { columnOpen: id  }, $push: { columnProgress: id  } })
      .then(() => {
      Column.updateMany(
        { role: 'Teacher', user: { "$ne": req.user.id } },
        { $pull: { "columnOpen": id  } }
        ).then(col => {
          console.log('remove assign tickets for other teachers ', col)
        })
      })
      // updating the student and TAs states when the ticket had assignee before
      } else {
        Column.findOneAndUpdate({ user: ticket.assignee }, { $pull: { columnProgress: id  } }, { new: true}).then(col => {
          console.log('updated old teacher', col)
        });
        Column.findOneAndUpdate({ user: req.user.id }, { $push: { columnProgress: id  } }, { new: true}).then( col => {
          console.log('new teacher updated', col)
        });
      }
    })
  })


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