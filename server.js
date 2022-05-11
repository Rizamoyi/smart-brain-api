const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/sigin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'samkach',
    password: 'samkach',
    database: 'smart-brain',
  },
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Successfully connected!');
});

app.post('/signin', signin.handleSignIn(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfileGet(db));
app.put('/image', image.handleImage(db));
app.post('/imageUrl', (req, res) => image.handleApiCall(req, res));

app.listen(3000, () => {
  console.log('The app is running on port 3000');
});
