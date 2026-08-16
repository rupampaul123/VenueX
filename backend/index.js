const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const user = require('./models/user.models');
const bookings = require('./models/bookings.models');
const venue = require('./models/listings.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const port = 3000;
const JWT_SECRET = '123';

// ---- Google OAuth config (replace with your real values) ----
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
const GOOGLE_CLIENT_SECRET = 'YOUR_GOOGLE_CLIENT_SECRET';
const GOOGLE_CALLBACK_URL = 'https://venuex-bmu7.onrender.com/auth/google/callback';
const FRONTEND_URL = 'https://venue-x.vercel.app';

const isProduction = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  maxAge: 24 * 60 * 60 * 1000,
};

app.use(cookie());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://venue-x.vercel.app'],
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

mongoose
  .connect('mongodb+srv://rupampaulbag:ronsunbum@cluster0.n2kiclx.mongodb.net/VenueX')
  .then(() => console.log('database connected'))
  .catch(err => console.log(err));

// ---- Passport Google strategy ----
passport.use(
  new GoogleStrategy(
    {
      clientID: `641106262613-ui4aiiqgro2lo7seq0rvkqgkoipjnt22.apps.googleusercontent.com`,
      clientSecret: `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`,
      callbackURL: `https://venuex-bmu7.onrender.com/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let existing = await user.findOne({ email });

        if (existing) {
          if (!existing.googleId) {
            existing.googleId = profile.id;
            await existing.save();
          }
          return done(null, existing);
        }

        const newUser = await user.create({
          name: profile.displayName,
          email,
          googleId: profile.id,
          role: 'user',
        });
        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send('hi');
});

app.post('/signup', async (req, res) => {
  try {
    const { name, email, phoneno, password, role } = req.body;
    const existing = await user.findOne({ email });
    if (existing) return res.status(400).json({ message: 'user already exists!' });

    const hash = await bcrypt.hash(password, 10);
    const newUser = new user({ name, email, phoneno, password: hash, role });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      JWT_SECRET
    );
    res.cookie('token', token, cookieOptions);
    return res.status(201).json({ message: 'user created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await user.findOne({ email });
    if (!existing) return res.status(404).json({ message: 'user does not exist' });

    const match = await bcrypt.compare(password, existing.password);
    if (!match) return res.status(400).json({ message: 'Wrong password' });

    const token = jwt.sign(
      { id: existing._id, email: existing.email, role: existing.role },
      JWT_SECRET
    );
    res.cookie('token', token, cookieOptions);

    return res.status(200).json({ message: 'user logged in successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- Google OAuth routes ----
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${FRONTEND_URL}/login` }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email, role: req.user.role },
      JWT_SECRET
    );
    res.cookie('token', token, cookieOptions);
    res.redirect(FRONTEND_URL);
  }
);

app.get('/navbar', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      const role = decoded.role;
      res.json(role);
    } else {
      return res.status(401).json({ message: 'No token provided' });
    }
  } catch (err) {
    console.log('error', err);
    return res.status(401).json({ message: 'Invalid token' });
  }
});

app.get('/venues', async (req, res) => {
  try {
    let listings = await venue.find().lean();
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: 'Error in fetching data', error: err.message });
  }
});

app.get('/me', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ loggedIn: false });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({ loggedIn: true, user: decoded });
  } catch (err) {
    return res.status(401).json({ loggedIn: false });
  }
});

app.get('/add', isAdmin, (req, res) => {
  try {
    console.log('is admin');
    res.json({ message: 'Admin access granted' });
  } catch (err) {
    console.log('not admin');
    res.status(403).json({ message: 'Not admin' });
  }
});

app.post('/form', async (req, res) => {
  try {
    const token = req.cookies.token;
    let userid;
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      userid = decoded.id;
    }
    const { name, location, price, phoneno, image, content } = req.body;
    const listings = new venue({ userid, name, location, price, phoneno, image, content });
    await listings.save();
    res.status(201).json({ message: 'Venue added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/profile', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      const profile = await user.findById(decoded.id);
      if (profile) res.json(profile);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

app.get('/logout', (req, res) => {
  res.clearCookie('token', cookieOptions);
  return res.json({ message: 'Logged out successfully' });
});

app.get('/details/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await venue.findById(id);
    if (result) res.json(result);
    else res.status(404).json({ message: 'Venue not found' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error fetching venue details' });
  }
});

app.post('/bookings/:venueid', async (req, res) => {
  try {
    const { name, phoneno, start, end } = req.body;
    const { venueid } = req.params;
    const token = req.cookies.token;
    const v = await venue.findById(venueid);
    const url = v.image;
    let userid;
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      userid = decoded.id;
    }

    if (!name || !phoneno || !start || !end)
      return res.status(400).json({ message: 'All fields required' });

    const startDate = new Date(start);
    const endDate = new Date(end);
    if (isNaN(startDate) || isNaN(endDate))
      return res.status(400).json({ message: 'Invalid date format' });

    const newBooking = new bookings({
      venueid,
      userid,
      name,
      phoneno,
      start: startDate,
      end: endDate,
      url,
    });
    await newBooking.save();

    res.status(201).json({ message: 'Booking successful' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

app.get('/booked', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      const userid = decoded.id;
      const booking = await bookings.find({ userid });
      res.json(booking);
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

app.get('/listed', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      const userid = decoded.id;
      const listings = await venue.find({ userid });
      res.json(listings);
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error fetching listings' });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

function isAdmin(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Not logged in' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role === 'admin') return next();
    return res.status(403).json({ message: 'Admins only' });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
