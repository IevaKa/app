const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ticketSchema = new Schema({
    // user_id of the student
    createdBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    category: {
        type: String,
        enum: ['lab', 'error', 'general/understanding', 'setup']
    },
    // properties: week, topics (routing, crud, etc), iterations
    lab: {
        type: String,
        // enum: ['React|Ironbeers', 'React|Wiki Countries', 'React|IronBook']
    },
    // user id of a TA picks up the ticket
    assignee: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    title: String,
    description: String,
    screenshots: [{
        imgName: String,
        imgPath: String,
        publicId: String
    }],
    // Student opens a tickets, can cancel it. TA moves it to progress, and solved
    status: {
        type: String,
        enum: ['Opened', 'In progress', 'Cancelled', 'Solved']
    },
    
    createdAt: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    assignedAt: { 
        type: Date
        // required: true, 
        // default: Date.now 
    },
    inProgressAt: { 
        type: Date
        // required: true, 
        // default: Date.now 
    },
    cancelledAt: { 
        type: Date
        // required: true, 
        // default: Date.now 
    },
    solvedAt: { 
        type: Date
        // required: true, 
        // default: Date.now 
    }
});

const Ticket = model('Ticket', ticketSchema);

module.exports = Ticket;