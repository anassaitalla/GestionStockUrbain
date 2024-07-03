const express = require('express');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  (username, password, done) => {
    if (username === 'admin' && password === 'password') {
      return done(null, { id: 1, username: 'admin' });
    } else {
      return done(null, false, { message: 'Incorrect username or password.' });
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, { id: 1, username: 'admin' });
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message || 'Authentication failed' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ message: 'Login successful', user: req.user });
    });
  })(req, res, next);
});

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.json({ message: 'Logout successful' });
  });
});

// app.get('/api/protected-data', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json({ message: 'This is protected data', data: [1, 2, 3, 4, 5] });
//   } else {
//     res.status(401).json({ message: 'Not authenticated' });
//   }
// });

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the backend!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});