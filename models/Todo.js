const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subtaskSchema = require('./Subtask');

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    date: {
        default: new Date(),
        type: Date
    },
    sub_tasks: [subtaskSchema]
});

module.exports = mongoose.model('todos', todoSchema);