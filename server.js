const express        = require('express');
const logger         = require('morgan');
const methodOverride = require('method-override');
const session        = require('express-session');
const db             = require('./db');
const userRouter = require('./routes/userRouter.js')
const courseRouter = require('./routes/courseRouter.js')
const lessonRouter = require('./routes/lessonRouter.js')
const authRouter = require('./routes/authRouter.js');
const Course = require('./models/course.js');

require('dotenv').config();

const app = express();

//app.use(express.static('public'))  for css later

app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))

app.use((req, res, next) => {
  res.locals.user = req.session.user
  res.locals.course = req.session.course
  next()
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/users', userRouter)
app.use('/courses', courseRouter)
app.use('/auth', authRouter);
app.use('/lessons', lessonRouter)


app.get('/', async (req, res) => {
  const allCourses = await Course.find();
  req.session.course = {
    courses: allCourses,
  }
  req.session.save();
  res.render('index.ejs');
})

const PORT = process.env.PORT ? process.env.PORT : 3000;

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
})