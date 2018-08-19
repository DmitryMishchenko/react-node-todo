const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subtaskSchema = new Schema({
    title: {
        type: String
    },
    status: {
        type: String
    }
});

module.exports = subtaskSchema;