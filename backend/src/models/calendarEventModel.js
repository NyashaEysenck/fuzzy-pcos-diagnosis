const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['period', 'symptom', 'medication', 'appointment', 'other'],
    required: true
  },
  // For symptom events
  symptom: {
    type: String,
    enum: ['acne', 'hairLoss', 'excessHairGrowth', 'weightGain', 'fatigue', 'cravings', 'other'],
    required: function() {
      return this.type === 'symptom';
    }
  },
  severity: {
    type: String,
    enum: ['mild', 'moderate', 'severe'],
    required: function() {
      return this.type === 'symptom';
    }
  },
  // For period events
  note: {
    type: String,
    trim: true
  },
  // For appointment events
  title: {
    type: String,
    trim: true,
    required: function() {
      return this.type === 'appointment' || this.type === 'other';
    }
  },
  // For medication events
  medication: {
    type: String,
    trim: true,
    required: function() {
      return this.type === 'medication';
    }
  },
  dosage: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Create index for efficient querying by user and date
calendarEventSchema.index({ user: 1, date: -1 });

const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);

module.exports = CalendarEvent;
