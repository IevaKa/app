const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const columnSchema = new Schema({
  user: {
      type: Schema.Types.ObjectId, 
      ref: 'User' 
  },
  role: {
    type: String,
    enum: ['Teacher', 'Student'],
    required: true
  },
  columnOpen: [ {      
    type: Schema.Types.ObjectId, 
    ref: 'Ticket' 
  } ],
  columnProgress: [ {      
    type: Schema.Types.ObjectId, 
    ref: 'Ticket' 
  } ],
  columnDone: [ {      
    type: Schema.Types.ObjectId, 
    ref: 'Ticket' 
  } ],
  columnCancelled: [ {      
    type: Schema.Types.ObjectId, 
    ref: 'Ticket' 
  } ]
})

const Column = model('Column', columnSchema);

module.exports = Column;