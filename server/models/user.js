const mongoose = require('mongoose');
const DateOnly = require('mongoose-dateonly')(mongoose);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  tasks: [{
    title: {
      type: String,
      required: true
    },
    dueDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    }
  }]
});

module.exports = mongoose.model('User', userSchema);