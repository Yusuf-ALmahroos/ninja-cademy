const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true },
  password: { type: String, required: true },
  coursesEnrolled: [String],
  coursesCompleted: [String],
  isAdmin: { type: Boolean },
  
  
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
