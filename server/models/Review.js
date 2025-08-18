const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  scores: {
    // Structured scoring criteria
    clarity: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    quality: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    originality: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    technical: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    presentation: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    }
  },
  feedback: {
    strengths: {
      type: String,
      trim: true,
      maxlength: 1000
    },
    weaknesses: {
      type: String,
      trim: true,
      maxlength: 1000
    },
    suggestions: {
      type: String,
      trim: true,
      maxlength: 1000
    },
    general: {
      type: String,
      trim: true,
      maxlength: 1000
    }
  },
  overallRating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  isAnonymous: {
    type: Boolean,
    default: true
  },
  isHelpful: {
    type: Boolean,
    default: false
  },
  helpfulCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'approved', 'rejected'],
    default: 'submitted'
  }
}, {
  timestamps: true
});

// Indexes for faster queries
reviewSchema.index({ project: 1 });
reviewSchema.index({ reviewer: 1 });
reviewSchema.index({ createdAt: -1 });

// Calculate average score from individual criteria
reviewSchema.virtual('averageScore').get(function() {
  const scores = Object.values(this.scores);
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
});

// Ensure virtuals are serialized
reviewSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Review', reviewSchema);
