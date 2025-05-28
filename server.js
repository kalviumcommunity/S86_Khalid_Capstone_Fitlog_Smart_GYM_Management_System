const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const User = require('./models/user');
const Post = require('./models/post');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'your_mongodb_uri_here', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection failed:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the GET API server');
});

app.post('/api/users', async (req, res) => {
  try {
    const { name, email, age, city } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    const newUser = new User({ name, email, age, city });
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error });
  }
});

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

app.get('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user by ID', error });
  }
});

app.get('/api/search', async (req, res) => {
  const { city } = req.query;
  try {
    const users = await User.find({ city: city });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users by city', error });
  }
});

app.get('/api/info', (req, res) => {
  res.json({
    project: 'Capstone GET API',
    author: 'Your Name',
    date: new Date().toLocaleDateString()
  });
});

app.get('/api/greet/:name', (req, res) => {
  const { name } = req.params;
  res.send(`Hello, ${name}`);
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'running', timestamp: new Date() });
});

app.get('/api/count', async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ userCount: count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to count users', error });
  }
});

app.get('/api/random', async (req, res) => {
  try {
    const users = await User.find();
    const randomIndex = Math.floor(Math.random() * users.length);
    const randomUser = users[randomIndex];
    res.json(randomUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get random user', error });
  }
});

app.get('/api/test', (req, res) => {
  res.send('This is a test route');
});

app.get('/api/delay', (req, res) => {
  setTimeout(() => {
    res.send('This is a delayed response');
  }, 3000);
});

app.get('/api/headers', (req, res) => {
  res.json({ headers: req.headers });
});

app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    if (!title || !userId) {
      return res.status(400).json({ message: 'Title and userId are required' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newPost = new Post({ title, content, user: userId });
    const savedPost = await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: savedPost });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post', error });
  }
});

app.get('/api/users/:id/posts', async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id }).populate('user');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts for user', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
