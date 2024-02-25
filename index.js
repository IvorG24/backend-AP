// index.js
import express from 'express';
import cors from 'cors';
import { connectToDb, getDb } from './database.js';
import { Signup } from './routes/signup.js';

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request body
// db connection
let db;

connectToDb((err) => {
  if (err) {
    console.error('Failed to connect to database:', err);
    return;
  }
  db = getDb();
  app.listen(5000, () => console.log('App is running'));
});

// routes
app.post('/user/signup', async (req, res) => {
  try {
    const { email } = req.body; // Extract email from request body
    const existingUser = await db.collection('users').findOne({ email }); // Check if email already exists
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    await db.collection('users').insertOne(req.body);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/getData', (req, res) => {
  db.collection('user').find(); // toArray all the document forEach one at a time
  res.send('Hello');
});
