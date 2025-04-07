const mongoose = require('mongoose');

const symptomSchema = new mongoose.Schema({
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
  // Menstrual symptoms
  irregularPeriods: {
    type: String,
    enum: ['none', 'mild', 'moderate', 'severe'],
    default: 'none'
  },
  heavyBleeding: {
    type: String,
    enum: ['none', 'mild', 'moderate', 'severe'],
    default: 'none'
  },
  missedPeriods: {
    type: String,
    enum: ['none', 'mild', 'moderate', 'severe'],
    default: 'none'
  },
  // Hormonal symptoms
  acne: {
    type: String,
    enum: ['none', 'mild', 'moderate', 'severe'],
    default: 'none'
  },
  hairLoss: {
    type: String,
    enum: ['none', 'mild', 'moderate', 'severe'],
    default: 'none'
  },
  excessHairGrowth: {
    type: String,
    enum: ['none', 'mild', 'moderate', 'severe'],
    default: 'none'
  },
  // Metabolic symptoms
  weightGain: {
    type: String,
    enum: ['none', 'mild', 'moderate', 'severe'],
    default: 'none'
  },
  fatigue: {
    type: String,
    enum: ['none', 'mild', 'moderate', 'severe'],
    default: 'none'
  },
  cravings: {
    type: String,
    enum: ['none', 'mild', 'moderate', 'severe'],
    default: 'none'
  },
  // Additional notes
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Create index for efficient querying by user and date
symptomSchema.index({ user: 1, date: -1 });

const Symptom = mongoose.model('Symptom', symptomSchema);

module.exports = Symptom;
