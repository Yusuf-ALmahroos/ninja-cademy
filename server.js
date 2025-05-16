const express        = require('express');
const logger         = require('morgan');
const methodOverride = require('method-override');
const session        = require('express-session');
const db             = require('./db');

const authRouter = require('./routes/authRouter.js');

require('dotenv').config();

const app = express();

//app.use(express.static('public'))  for css later

app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.render('index.ejs');
})

const PORT = process.env.PORT ? process.env.PORT : 3000;

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
})

app.use('/auth', authRouter);