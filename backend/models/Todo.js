const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,    // task must have a title
    trim: true         // removes extra spaces
  },
  completed: {
    type: Boolean,
    default: false     // new tasks start as not done
  }
}, {
  timestamps: true     // auto-adds createdAt & updatedAt
});

// Export this model so routes can use it
module.exports = mongoose.model('Todo', todoSchema);