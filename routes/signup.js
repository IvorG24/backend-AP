import express from 'express';
const router = express.Router();
import { getDb } from '../database.js';
export const Signup = () => {
  router.post('/user/signup', async (req, res) => {
    const db = getDb(); // Get the MongoDB database instance
    try {
      const userData = req.body; // Assuming user data is sent in the request body
      // Insert user data into the MongoDB collection
      await db.collection('user').insertOne(userData);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};

export default router;
