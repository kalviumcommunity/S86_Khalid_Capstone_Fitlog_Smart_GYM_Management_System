const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  age: {
    type: Number,
    min: 13
  },
  city: {
    type: String,
    default: "Unknown"
  }
}, {
  timestamps: true
});
