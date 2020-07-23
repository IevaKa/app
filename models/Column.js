const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const columnSchema = new Schema({
  ticketIds: {
    type: Schema.Types.ObjectId,
    ref: 'Ticket',
  },
  title: 'String',
  id: 'String'
});

const Column = model("Column", columnSchema);

module.exports = Column;
