const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const columnSchema = new Schema({
  id: {
    type: String,
    enum: ['columnOpen', 'columnProgress', 'columnDone']
  },
  title: {
    type: String,
    enum: ["Open", "In progress", "Done"]
  },
  ticketIds: [String]
})

const Column = model('Column', columnSchema);

module.exports = Column;