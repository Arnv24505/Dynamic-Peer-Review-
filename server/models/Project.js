const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  category: {
    type: String,
    required: true,
    enum: ['essay', 'code', 'artwork', 'video', 'presentation', 'research', 'other'],
    default: 'other'
  },
  tags: [{
    type: String,
    trim: true
  }],
  filePath: {
    type: String,
    required: false
  },
  fileName: {
    type: String,
    required: false
  },
  fileType: {
    type: String,
    required: false
  },
  submitter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'under_review', 'completed', 'archived'],
    default: 'pending'
  },
  reviewers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  maxReviewers: {
    type: Number,
    default: 3
  },
  deadline: {
    type: Date
  },
  isAnonymous: {
    type: Boolean,
    default: true
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for faster queries
projectSchema.index({ submitter: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ tags: 1 });
projectSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);
