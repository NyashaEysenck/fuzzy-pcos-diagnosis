/**
 * Sample Data Loading Script for PCOS Smart Insights
 * 
 * This script creates sample users, assessments, symptoms, and calendar events
 * for demonstration and testing purposes.
 * 
 * Usage: node loadSampleData.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/userModel');
const Assessment = require('./models/assessmentModel');
const Symptom = require('./models/symptomModel');
const CalendarEvent = require('./models/calendarEventModel');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pcos-insights')
  .then(() => console.log('MongoDB Connected for sample data loading'))
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

// Sample data
const sampleUsers = [
  {
    name: 'Amara Okafor',
    email: 'amara@example.com',
    password: 'password123'
  },
  {
    name: 'Zainab Diallo',
    email: 'zainab@example.com',
    password: 'password123'
  },
  {
    name: 'Nala Mandela',
    email: 'nala@example.com',
    password: 'password123'
  }
];

// Function to generate a random date within the last 3 months
const getRandomRecentDate = () => {
  const now = new Date();
  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
  return new Date(threeMonthsAgo.getTime() + Math.random() * (now.getTime() - threeMonthsAgo.getTime()));
};

// Function to get a random severity level
const getRandomSeverity = () => {
  const severities = ['none', 'mild', 'moderate', 'severe'];
  return severities[Math.floor(Math.random() * severities.length)];
};

// Function to generate assessment data for a user
const generateAssessmentData = (userId) => {
  // Generate random contribution values that sum to 1
  const menstrualContribution = Math.random() * 0.4 + 0.1; // 0.1 to 0.5
  const hormonalContribution = Math.random() * 0.4 + 0.1; // 0.1 to 0.5
  const remainingContribution = 1 - menstrualContribution - hormonalContribution;
  const metabolicContribution = Math.max(0.05, Math.min(0.5, remainingContribution)); // Ensure it's between 0.05 and 0.5
  
  // Calculate total score (weighted average)
  const score = menstrualContribution + hormonalContribution + metabolicContribution;
  
  // Determine risk level based on score
  let riskLevel;
  if (score < 0.3) riskLevel = 'low';
  else if (score < 0.5) riskLevel = 'medium';
  else if (score < 0.8) riskLevel = 'high';
  else riskLevel = 'very_high';
  
  // Generate recommendations based on risk level
  const recommendations = [];
  if (riskLevel === 'medium' || riskLevel === 'high' || riskLevel === 'very_high') {
    recommendations.push('Consider consulting with an endocrinologist');
    recommendations.push('Monitor your symptoms regularly');
  }
  if (riskLevel === 'high' || riskLevel === 'very_high') {
    recommendations.push('Follow a low-glycemic diet');
    recommendations.push('Aim for 150 minutes of moderate exercise weekly');
  }
  if (riskLevel === 'very_high') {
    recommendations.push('Consider medication options with your healthcare provider');
    recommendations.push('Join a PCOS support group');
  }
  
  return {
    user: userId,
    date: getRandomRecentDate(),
    score: score,
    riskLevel: riskLevel,
    details: {
      menstrualContribution,
      hormonalContribution,
      metabolicContribution
    },
    recommendations,
    symptoms: {
      // Menstrual symptoms
      irregularPeriods: getRandomSeverity(),
      heavyBleeding: getRandomSeverity(),
      missedPeriods: getRandomSeverity(),
      // Hormonal symptoms
      acne: getRandomSeverity(),
      hairLoss: getRandomSeverity(),
      excessHairGrowth: getRandomSeverity(),
      // Metabolic symptoms
      weightGain: getRandomSeverity(),
      fatigue: getRandomSeverity(),
      cravings: getRandomSeverity()
    }
  };
};

// Function to generate symptom tracking data
const generateSymptomData = (userId) => {
  const symptomTypes = [
    'irregularPeriods', 'heavyBleeding', 'missedPeriods', 
    'acne', 'hairLoss', 'excessHairGrowth',
    'weightGain', 'fatigue', 'cravings',
    'moodSwings', 'headache', 'bloating'
  ];
  
  const randomSymptoms = [];
  
  // Generate 30-60 symptom entries over the last 3 months
  const numEntries = Math.floor(Math.random() * 30) + 30;
  
  for (let i = 0; i < numEntries; i++) {
    const symptomType = symptomTypes[Math.floor(Math.random() * symptomTypes.length)];
    const severity = getRandomSeverity();
    if (severity === 'none') continue; // Skip logging "none" severity symptoms
    
    randomSymptoms.push({
      user: userId,
      date: getRandomRecentDate(),
      type: symptomType,
      severity: severity,
      notes: `Tracked ${symptomType} symptom`
    });
  }
  
  return randomSymptoms;
};

// Function to generate calendar events
const generateCalendarEvents = (userId) => {
  const eventTypes = [
    'period', 'symptom', 'medication', 'appointment', 'other'
  ];
  
  const eventDetails = {
    period: {
      titles: ['Period Started', 'Period Ended'],
      notes: ['First day', 'Last day', 'Heavy flow', 'Light flow']
    },
    symptom: {
      symptoms: ['acne', 'hairLoss', 'excessHairGrowth', 'weightGain', 'fatigue', 'cravings', 'other'],
      severities: ['mild', 'moderate', 'severe']
    },
    medication: {
      medications: ['Metformin', 'Spironolactone', 'Birth Control Pills', 'Inositol Supplement', 'Vitamin D'],
      dosages: ['500mg', '100mg', '1 pill', '2000mg', '1000 IU']
    },
    appointment: {
      titles: ['Gynecologist Appointment', 'Endocrinologist Visit', 'Nutritionist Consultation', 'Therapy Session']
    },
    other: {
      titles: ['Yoga Session', 'Cardio Workout', 'Strength Training', 'Meditation', 'Log Symptoms']
    }
  };
  
  const randomEvents = [];
  
  // Generate 10-20 calendar events
  const numEvents = Math.floor(Math.random() * 10) + 10;
  
  for (let i = 0; i < numEvents; i++) {
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    
    // Generate event date (including future dates for appointments)
    const now = new Date();
    const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
    const threeMonthsAhead = new Date(now.getFullYear(), now.getMonth() + 3, now.getDate());
    const eventDate = new Date(threeMonthsAgo.getTime() + Math.random() * (threeMonthsAhead.getTime() - threeMonthsAgo.getTime()));
    
    // Base event object
    const event = {
      user: userId,
      date: eventDate,
      type: eventType
    };
    
    // Add type-specific fields
    switch(eventType) {
      case 'period':
        event.title = eventDetails.period.titles[Math.floor(Math.random() * eventDetails.period.titles.length)];
        event.note = eventDetails.period.notes[Math.floor(Math.random() * eventDetails.period.notes.length)];
        break;
        
      case 'symptom':
        event.symptom = eventDetails.symptom.symptoms[Math.floor(Math.random() * eventDetails.symptom.symptoms.length)];
        event.severity = eventDetails.symptom.severities[Math.floor(Math.random() * eventDetails.symptom.severities.length)];
        break;
        
      case 'medication':
        const medIndex = Math.floor(Math.random() * eventDetails.medication.medications.length);
        event.medication = eventDetails.medication.medications[medIndex];
        event.dosage = eventDetails.medication.dosages[medIndex];
        event.title = `Take ${event.medication}`;
        break;
        
      case 'appointment':
        event.title = eventDetails.appointment.titles[Math.floor(Math.random() * eventDetails.appointment.titles.length)];
        break;
        
      case 'other':
        event.title = eventDetails.other.titles[Math.floor(Math.random() * eventDetails.other.titles.length)];
        break;
    }
    
    randomEvents.push(event);
  }
  
  return randomEvents;
};

// Main function to load sample data
const loadSampleData = async () => {
  try {
    // Create users (only if they don't already exist)
    const users = [];
    for (const userData of sampleUsers) {
      // Check if user already exists
      let user = await User.findOne({ email: userData.email });
      
      if (!user) {
        // Create new user if doesn't exist
        // Don't hash the password here - let the User model's pre-save middleware do it
        user = await User.create({
          name: userData.name,
          email: userData.email,
          password: userData.password  // Pass plain password, User model will hash it
        });
        console.log(`Created user: ${userData.name} (${userData.email})`);
      } else {
        console.log(`User already exists: ${userData.name} (${userData.email})`);
      }
      
      users.push(user);
    }
    
    // Create assessments (1-3 per user, only if they don't have assessments already)
    for (const user of users) {
      // Check if user already has assessments
      const existingAssessments = await Assessment.countDocuments({ user: user._id });
      
      if (existingAssessments === 0) {
        const numAssessments = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numAssessments; i++) {
          const assessmentData = generateAssessmentData(user._id);
          await Assessment.create(assessmentData);
        }
        console.log(`Created ${numAssessments} assessments for ${user.name}`);
      } else {
        console.log(`${user.name} already has ${existingAssessments} assessments, skipping`);
      }
      
      // Check if user already has symptoms
      const existingSymptoms = await Symptom.countDocuments({ user: user._id });
      
      if (existingSymptoms === 0) {
        // Create symptoms
        const symptoms = generateSymptomData(user._id);
        if (symptoms.length > 0) {
          await Symptom.insertMany(symptoms);
          console.log(`Created ${symptoms.length} symptom entries for ${user.name}`);
        }
      } else {
        console.log(`${user.name} already has ${existingSymptoms} symptom entries, skipping`);
      }
      
      // Check if user already has calendar events
      const existingEvents = await CalendarEvent.countDocuments({ user: user._id });
      
      if (existingEvents === 0) {
        // Create calendar events
        const events = generateCalendarEvents(user._id);
        if (events.length > 0) {
          await CalendarEvent.insertMany(events);
          console.log(`Created ${events.length} calendar events for ${user.name}`);
        }
      } else {
        console.log(`${user.name} already has ${existingEvents} calendar events, skipping`);
      }
    }
    
    console.log('Sample data loading completed successfully!');
    console.log('\nDemo Users:');
    sampleUsers.forEach(user => {
      console.log(`- Email: ${user.email}, Password: ${user.password}`);
    });
    
  } catch (error) {
    console.error('Error loading sample data:', error);
  } finally {
    // Close database connection
    mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the data loading function
loadSampleData();
