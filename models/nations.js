const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema bình luận
const commentSchema = new Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Định nghĩa schema quốc gia
const nationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  comments: [commentSchema] // Mảng chứa các bình luận
}, {
  timestamps: true
});

var Nations = mongoose.model('Nations', nationSchema); // Tạo model
module.exports = Nations; // Xuất model
