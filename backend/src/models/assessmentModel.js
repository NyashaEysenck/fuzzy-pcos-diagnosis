const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  },
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high', 'very_high'],
    required: true
  },
  details: {
    menstrualContribution: {
      type: Number,
      required: true
    },
    hormonalContribution: {
      type: Number,
      required: true
    },
    metabolicContribution: {
      type: Number,
      required: true
    }
  },
  recommendations: [{
    type: String
  }],
  symptoms: {
    // Menstrual symptoms
    irregularPeriods: {
      type: String,
      enum: ['none', 'mild', 'moderate', 'severe'],
      required: true
    },
    heavyBleeding: {
      type: String,
      enum: ['none', 'mild', 'moderate', 'severe'],
      required: true
    },
    missedPeriods: {
      type: String,
      enum: ['none', 'mild', 'moderate', 'severe'],
      required: true
    },
    // Hormonal symptoms
    acne: {
      type: String,
      enum: ['none', 'mild', 'moderate', 'severe'],
      required: true
    },
    hairLoss: {
      type: String,
      enum: ['none', 'mild', 'moderate', 'severe'],
      required: true
    },
    excessHairGrowth: {
      type: String,
      enum: ['none', 'mild', 'moderate', 'severe'],
      required: true
    },
    // Metabolic symptoms
    weightGain: {
      type: String,
      enum: ['none', 'mild', 'moderate', 'severe'],
      required: true
    },
    fatigue: {
      type: String,
      enum: ['none', 'mild', 'moderate', 'severe'],
      required: true
    },
    cravings: {
      type: String,
      enum: ['none', 'mild', 'moderate', 'severe'],
      required: true
    }
  }
}, {
  timestamps: true
});

// Create index for efficient querying by user and date
assessmentSchema.index({ user: 1, date: -1 });

const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;
