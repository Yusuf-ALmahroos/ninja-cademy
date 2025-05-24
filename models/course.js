const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  categories:    [{type: String, required: true}],
  periodInWeeks: {type: Number, required: true},
  title:         {type: String, required: true},
  lessons:       [{type: mongoose.Schema.Types.ObjectId, ref: 'Lesson'}]
}, {timestamps: true})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;