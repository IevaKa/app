const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const labSchema = new Schema({
    title: {
        type: String,
        enum: ['React | Ironbeers', 'React | Wiki Countries', 'React | IronBook']
    },
    module: {
      type: Number,
      enum: [1, 2, 3], 
    },
    topics: [String],
    iteration: [String]
});

const Lab = model('Lab', labSchema);

module.exports = Lab;