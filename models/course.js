const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  categories:    [{type: String, required: true}],
  periodInWeeks: {type: Number, required: true},
  title:         {type: String, required: true},
  users:         [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  lessons:       [{type: mongoose.Schema.Types.ObjectId, ref: 'Lesson'}]
}, {timestamps: true})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;