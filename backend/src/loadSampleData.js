/**
 * Sample Data Loading Script for PCOS Smart Insights
 * 
 * This script creates sample users, assessments, symptoms, and calendar events
 * for demonstration and testing purposes with Zimbabwean user profiles.
 * 
 * Usage: node loadSampleData.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const Assessment = require('./models/assessmentModel');
const Symptom = require('./models/symptomModel');
const CalendarEvent = require('./models/calendarEventModel');

// Load environment variables
dotenv.config({ path: '../.env' });

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pcos-smart-insights')
  .then(() => console.log('MongoDB Connected for sample data loading'))
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

// Sample data with Zimbabwean names
const sampleUsers = [
  {
    name: 'Tendai Moyo',
    email: 'tendai@example.com',
    password: 'password123',
    profile: {
      age: 28,
      height: 165, // cm
      weight: 68, // kg
      occupation: 'Teacher',
      location: 'Harare'
    }
  },
  {
    name: 'Chiedza Nyathi',
    email: 'chiedza@example.com',
    password: 'password123',
    profile: {
      age: 32,
      height: 170, // cm
      weight: 75, // kg
      occupation: 'Nurse',
      location: 'Bulawayo'
    }
  },
  {
    name: 'Rudo Mabhena',
    email: 'rudo@example.com',
    password: 'password123',
    profile: {
      age: 24,
      height: 162, // cm
      weight: 63, // kg
      occupation: 'Software Developer',
      location: 'Gweru'
    }
  },
  {
    name: 'Nyasha Mutasa',
    email: 'nyasha@example.com',
    password: 'password123',
    profile: {
      age: 30,
      height: 168, // cm
      weight: 72, // kg
      occupation: 'Accountant',
      location: 'Mutare'
    }
  }
];

// Zimbabwean medical facilities for appointments
const medicalFacilities = [
  'Parirenyatwa Hospital',
  'Avenues Clinic',
  'Mpilo Central Hospital',
  'United Bulawayo Hospitals',
  'Chitungwiza Central Hospital',
  'West End Hospital',
  'Mater Dei Hospital',
  'Harare Central Hospital'
];

// Common medications used in Zimbabwe for PCOS
const medications = [
  {
    name: 'Metformin',
    dosages: ['500mg once daily', '500mg twice daily', '850mg twice daily', '1000mg twice daily']
  },
  {
    name: 'Clomiphene',
    dosages: ['50mg daily for 5 days', '100mg daily for 5 days']
  },
  {
    name: 'Diane-35',
    dosages: ['1 tablet daily']
  },
  {
    name: 'Yasmin',
    dosages: ['1 tablet daily']
  },
  {
    name: 'Inositol',
    dosages: ['2g twice daily', '4g once daily']
  },
  {
    name: 'Vitamin D3',
    dosages: ['1000 IU daily', '2000 IU daily']
  }
];

// Function to generate a random date within the last 3 months
const getRandomRecentDate = () => {
  const now = new Date();
  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
  return new Date(threeMonthsAgo.getTime() + Math.random() * (now.getTime() - threeMonthsAgo.getTime()));
};

// Function to get a random date in the future (up to 2 months)
const getRandomFutureDate = () => {
  const now = new Date();
  const twoMonthsAhead = new Date(now.getFullYear(), now.getMonth() + 2, now.getDate());
  return new Date(now.getTime() + Math.random() * (twoMonthsAhead.getTime() - now.getTime()));
};

// Function to get a random severity level
const getRandomSeverity = () => {
  const severities = ['none', 'mild', 'moderate', 'severe'];
  return severities[Math.floor(Math.random() * severities.length)];
};

// Function to get a weighted random severity (to create more realistic patterns)
const getWeightedSeverity = (bias, modifier = 0) => {
  // Base probabilities based on bias
  let probabilities = {
    none: 0.05,
    mild: 0.1,
    moderate: 0.1,
    severe: 0.05
  };

  // Adjust based on bias
  switch (bias) {
    case 'mild':
      probabilities.none = 0.2;
      probabilities.mild = 0.6;
      probabilities.moderate = 0.15;
      probabilities.severe = 0.05;
      break;
    case 'moderate':
      probabilities.none = 0.1;
      probabilities.mild = 0.2;
      probabilities.moderate = 0.6;
      probabilities.severe = 0.1;
      break;
    case 'severe':
      probabilities.none = 0.05;
      probabilities.mild = 0.1;
      probabilities.moderate = 0.25;
      probabilities.severe = 0.6;
      break;
    case 'none':
    default:
      probabilities.none = 0.8;
      probabilities.mild = 0.15;
      probabilities.moderate = 0.05;
      probabilities.severe = 0;
  }

  // Apply trend modifier
  if (modifier > 0) {
    // Trending worse - shift probabilities toward more severe
    probabilities.severe += modifier * probabilities.moderate;
    probabilities.moderate += modifier * probabilities.mild;
    probabilities.mild -= modifier * probabilities.mild * 0.5;
    probabilities.none -= modifier * probabilities.none * 0.5;
  } else if (modifier < 0) {
    // Trending better - shift probabilities toward less severe
    const absModifier = Math.abs(modifier);
    probabilities.none += absModifier * probabilities.mild;
    probabilities.mild += absModifier * probabilities.moderate;
    probabilities.moderate -= absModifier * probabilities.moderate * 0.5;
    probabilities.severe -= absModifier * probabilities.severe * 0.5;
  }

  // Normalize probabilities to ensure they sum to 1
  const total = Object.values(probabilities).reduce((sum, p) => sum + p, 0);
  Object.keys(probabilities).forEach(key => {
    probabilities[key] = probabilities[key] / total;
  });

  // Determine severity based on weighted probabilities
  const rand = Math.random();
  let cumulativeProbability = 0;

  for (const [severity, probability] of Object.entries(probabilities)) {
    cumulativeProbability += probability;
    if (rand <= cumulativeProbability) {
      return severity;
    }
  }

  // Fallback
  return 'none';
};

// User profiles with symptom biases
const userProfiles = [
  {
    // Tendai Moyo - Primarily menstrual symptoms with worsening trend over time
    symptomBias: {
      irregularPeriods: 'severe',
      heavyBleeding: 'moderate',
      missedPeriods: 'moderate',
      acne: 'mild',
      hairLoss: 'none',
      excessHairGrowth: 'mild',
      weightGain: 'mild',
      fatigue: 'moderate',
      cravings: 'mild',
      moodSwings: 'moderate',
      headache: 'mild',
      bloating: 'moderate'
    },
    // Trend: Symptoms worsen in first half, improve slightly in second half (treatment effect)
    trendPattern: 'worsen-improve'
  },
  {
    // Chiedza Nyathi - Primarily hormonal symptoms with cyclical pattern
    symptomBias: {
      irregularPeriods: 'mild',
      heavyBleeding: 'mild',
      missedPeriods: 'none',
      acne: 'severe',
      hairLoss: 'moderate',
      excessHairGrowth: 'severe',
      weightGain: 'moderate',
      fatigue: 'mild',
      cravings: 'moderate',
      moodSwings: 'severe',
      headache: 'moderate',
      bloating: 'mild'
    },
    // Trend: Symptoms follow a cyclical pattern (worse during certain phases)
    trendPattern: 'cyclical'
  },
  {
    // Rumbidzai Dube - Primarily metabolic symptoms with steady worsening
    symptomBias: {
      irregularPeriods: 'mild',
      heavyBleeding: 'none',
      missedPeriods: 'mild',
      acne: 'mild',
      hairLoss: 'mild',
      excessHairGrowth: 'moderate',
      weightGain: 'severe',
      fatigue: 'severe',
      cravings: 'severe',
      moodSwings: 'moderate',
      headache: 'mild',
      bloating: 'severe'
    },
    // Trend: Symptoms steadily worsen over time
    trendPattern: 'worsen'
  },
  {
    // Tatenda Moyo - Mixed symptoms with improvement trend
    symptomBias: {
      irregularPeriods: 'moderate',
      heavyBleeding: 'severe',
      missedPeriods: 'mild',
      acne: 'moderate',
      hairLoss: 'severe',
      excessHairGrowth: 'mild',
      weightGain: 'moderate',
      fatigue: 'moderate',
      cravings: 'mild',
      moodSwings: 'mild',
      headache: 'severe',
      bloating: 'moderate'
    },
    // Trend: Symptoms improve over time (treatment effect)
    trendPattern: 'improve'
  },
  {
    // Farai Ndoro - Mild symptoms with stable pattern
    symptomBias: {
      irregularPeriods: 'mild',
      heavyBleeding: 'mild',
      missedPeriods: 'mild',
      acne: 'mild',
      hairLoss: 'mild',
      excessHairGrowth: 'mild',
      weightGain: 'mild',
      fatigue: 'mild',
      cravings: 'mild',
      moodSwings: 'mild',
      headache: 'mild',
      bloating: 'mild'
    },
    // Trend: Symptoms remain relatively stable
    trendPattern: 'stable'
  }
];

// Function to generate symptom tracking data with consistent patterns and trends
const generateSymptomData = (userId, userIndex) => {
  const profile = userProfiles[userIndex];
  const symptomTypes = Object.keys(profile.symptomBias);
  const randomSymptoms = [];

  // Generate 30-45 symptom entries over the last 3 months (about 10-15 per month)
  const numEntries = Math.floor(Math.random() * 15) + 30;

  // Create a set of dates to avoid duplicate entries on the same day
  const dates = new Set();
  while (dates.size < numEntries) {
    const date = getRandomRecentDate();
    dates.add(date.toISOString().split('T')[0]); // Store as YYYY-MM-DD
  }

  // Convert back to Date objects and sort chronologically
  const dateArray = Array.from(dates)
    .map(dateStr => new Date(dateStr))
    .sort((a, b) => a - b);

  // Create cyclical patterns for menstrual symptoms
  // Assume a roughly 28-35 day cycle with variations
  const cycleLength = Math.floor(Math.random() * 7) + 28; // 28-35 days

  // For each date, log symptoms with realistic patterns
  dateArray.forEach((date, index) => {
    // Calculate normalized position in the dataset (0 to 1)
    const timePosition = index / dateArray.length;

    // Determine cycle day (approximation)
    const cycleDay = index % cycleLength;

    // Menstrual symptoms are more likely during certain cycle days
    const isMenstrualPhase = cycleDay < 7;
    const isOvulationPhase = cycleDay >= 12 && cycleDay <= 16;
    const isLutealPhase = cycleDay > 16;

    // Log 1-2 symptoms per day
    const symptomsToLog = [];

    // Add menstrual symptoms with higher probability during menstrual phase
    if (isMenstrualPhase) {
      if (Math.random() < 0.8) { // 80% chance during menstrual phase
        if (profile.symptomBias.irregularPeriods !== 'none')
          symptomsToLog.push('irregularPeriods');
        if (profile.symptomBias.heavyBleeding !== 'none' && Math.random() < 0.7)
          symptomsToLog.push('heavyBleeding');
      }
    }

    // Add hormonal symptoms with higher probability during ovulation and luteal phase
    if (isOvulationPhase || isLutealPhase) {
      if (Math.random() < 0.6) { // 60% chance
        if (profile.symptomBias.acne !== 'none' && Math.random() < 0.5)
          symptomsToLog.push('acne');
        if (profile.symptomBias.moodSwings !== 'none' && Math.random() < 0.6)
          symptomsToLog.push('moodSwings');
      }
    }

    // Add metabolic symptoms with consistent probability throughout cycle
    if (Math.random() < 0.4) { // 40% chance any day
      if (profile.symptomBias.fatigue !== 'none' && Math.random() < 0.5)
        symptomsToLog.push('fatigue');
      if (profile.symptomBias.weightGain !== 'none' && Math.random() < 0.3)
        symptomsToLog.push('weightGain');
    }

    // If no symptoms were selected, add 1 random one
    if (symptomsToLog.length === 0) {
      const shuffledSymptoms = [...symptomTypes].sort(() => 0.5 - Math.random());
      symptomsToLog.push(shuffledSymptoms[0]);
    }

    // Ensure we don't have too many symptoms per day
    const finalSymptoms = [...new Set(symptomsToLog)].slice(0, 2);

    finalSymptoms.forEach(symptomType => {
      const bias = profile.symptomBias[symptomType];

      // Create severity trends based on user profile trend pattern
      let severityModifier = 0;

      // Apply different trend patterns based on user profile
      switch (profile.trendPattern) {
        case 'worsen':
          // Symptoms steadily worsen over time
          severityModifier = timePosition * 0.4; // Gradually increase severity
          break;
        case 'improve':
          // Symptoms steadily improve over time
          severityModifier = -timePosition * 0.4; // Gradually decrease severity
          break;
        case 'worsen-improve':
          // Symptoms worsen then improve (treatment effect)
          if (timePosition < 0.6) {
            // First 60% - getting worse
            severityModifier = (timePosition / 0.6) * 0.4; // Increase severity
          } else {
            // Last 40% - improving
            severityModifier = -((timePosition - 0.6) / 0.4) * 0.4; // Decrease severity
          }
          break;
        case 'cyclical':
          // Cyclical pattern - severity follows a sine wave
          severityModifier = Math.sin(timePosition * Math.PI * 3) * 0.3; // Oscillating severity
          break;
        case 'stable':
        default:
          // Random minor fluctuations
          severityModifier = (Math.random() - 0.5) * 0.2; // Small random variations
      }

      // Apply the modifier but ensure we stay within valid severity ranges
      let effectiveBias = bias;
      if (bias === 'mild' && severityModifier > 0.2) effectiveBias = 'moderate';
      else if (bias === 'moderate' && severityModifier > 0.2) effectiveBias = 'severe';
      else if (bias === 'moderate' && severityModifier < -0.2) effectiveBias = 'mild';
      else if (bias === 'severe' && severityModifier < -0.2) effectiveBias = 'moderate';

      const severity = getWeightedSeverity(effectiveBias, severityModifier);

      if (severity === 'none') return; // Skip logging "none" severity symptoms

      // Generate more detailed notes based on symptom type and severity
      let notes = '';
      switch (symptomType) {
        case 'irregularPeriods':
          notes = severity === 'severe' ? 'Cycle length very unpredictable, over 40 days' :
            severity === 'moderate' ? 'Cycle length varies by 7-10 days' :
              'Slight variation in cycle length, about 5 days off';
          break;
        case 'heavyBleeding':
          notes = severity === 'severe' ? 'Needed to change pads/tampons every 1-2 hours' :
            severity === 'moderate' ? 'Heavier than usual flow' :
              'Slightly heavier flow than normal';
          break;
        case 'acne':
          notes = severity === 'severe' ? 'Multiple painful cystic acne spots' :
            severity === 'moderate' ? 'Several pimples on face and chin' :
              'Few small pimples';
          break;
        case 'weightGain':
          notes = severity === 'severe' ? 'Gained 3+ kg this month despite no diet changes' :
            severity === 'moderate' ? 'Clothes feeling tighter, gained 1-2 kg' :
              'Slight weight fluctuation';
          break;
        case 'fatigue':
          notes = severity === 'severe' ? 'Exhausted all day, needed naps' :
            severity === 'moderate' ? 'Low energy throughout the day' :
              'Slightly more tired than usual';
          break;
        case 'moodSwings':
          notes = severity === 'severe' ? 'Dramatic mood changes throughout the day' :
            severity === 'moderate' ? 'Noticeable irritability and sadness' :
              'Slightly more emotional than usual';
          break;
        default:
          notes = `${symptomType} - ${severity} severity`;
      }

      randomSymptoms.push({
        user: userId,
        date: date,
        type: symptomType,
        severity: severity,
        notes: notes
      });
    });
  });

  return randomSymptoms;
};

// Function to generate assessment data for a user
const generateAssessmentData = (userId, userIndex) => {
  const profile = userProfiles[userIndex];
  const userName = sampleUsers[userIndex].name.split(' ')[0];

  // Calculate contributions based on user profile
  let menstrualScore = 0;
  let hormonalScore = 0;
  let metabolicScore = 0;

  // Calculate menstrual score
  const menstrualSymptoms = ['irregularPeriods', 'heavyBleeding', 'missedPeriods'];
  menstrualSymptoms.forEach(symptom => {
    const severity = profile.symptomBias[symptom];
    if (severity === 'mild') menstrualScore += 0.1;
    else if (severity === 'moderate') menstrualScore += 0.2;
    else if (severity === 'severe') menstrualScore += 0.3;
  });
  menstrualScore = Math.min(0.5, menstrualScore);

  // Calculate hormonal score
  const hormonalSymptoms = ['acne', 'hairLoss', 'excessHairGrowth'];
  hormonalSymptoms.forEach(symptom => {
    const severity = profile.symptomBias[symptom];
    if (severity === 'mild') hormonalScore += 0.1;
    else if (severity === 'moderate') hormonalScore += 0.2;
    else if (severity === 'severe') hormonalScore += 0.3;
  });
  hormonalScore = Math.min(0.5, hormonalScore);

  // Calculate metabolic score
  const metabolicSymptoms = ['weightGain', 'fatigue', 'cravings'];
  metabolicSymptoms.forEach(symptom => {
    const severity = profile.symptomBias[symptom];
    if (severity === 'mild') metabolicScore += 0.1;
    else if (severity === 'moderate') metabolicScore += 0.2;
    else if (severity === 'severe') metabolicScore += 0.3;
  });
  metabolicScore = Math.min(0.5, metabolicScore);

  // Normalize to ensure they sum to 1
  const totalScore = menstrualScore + hormonalScore + metabolicScore;
  const menstrualContribution = menstrualScore / totalScore;
  const hormonalContribution = hormonalScore / totalScore;
  const metabolicContribution = metabolicScore / totalScore;

  // Calculate total score (weighted average)
  const score = (menstrualScore + hormonalScore + metabolicScore) / 1.5; // Normalize to 0-1 range

  // Determine risk level based on score
  let riskLevel;
  if (score < 0.3) riskLevel = 'low';
  else if (score < 0.5) riskLevel = 'medium';
  else if (score < 0.8) riskLevel = 'high';
  else riskLevel = 'very_high';

  // Generate personalized summary based on user's specific symptoms
  let summary = `Based on your symptom tracking over the past 3 months, ${userName}, `;

  // Add details about primary symptom category
  if (menstrualContribution > hormonalContribution && menstrualContribution > metabolicContribution) {
    summary += `your PCOS symptoms are primarily affecting your menstrual cycle. `;
    if (profile.symptomBias.irregularPeriods === 'severe') {
      summary += `Your highly irregular periods are a key indicator that requires attention. `;
    } else if (profile.symptomBias.heavyBleeding === 'severe') {
      summary += `The heavy bleeding you're experiencing is a significant concern. `;
    }
  } else if (hormonalContribution > menstrualContribution && hormonalContribution > metabolicContribution) {
    summary += `your PCOS appears to be manifesting primarily through hormonal symptoms. `;
    if (profile.symptomBias.acne === 'severe') {
      summary += `The persistent acne you're experiencing is likely related to hormonal imbalances. `;
    } else if (profile.symptomBias.hairLoss === 'severe') {
      summary += `Your hair loss pattern suggests androgen-related effects that should be addressed. `;
    }
  } else {
    summary += `your PCOS is primarily showing metabolic-related symptoms. `;
    if (profile.symptomBias.weightGain === 'severe') {
      summary += `The weight gain you're experiencing despite your efforts is a common PCOS challenge. `;
    } else if (profile.symptomBias.fatigue === 'severe') {
      summary += `Your persistent fatigue may be related to insulin resistance, which is common in PCOS. `;
    }
  }

  // Add risk level assessment
  if (riskLevel === 'low') {
    summary += `Overall, your symptoms suggest a low risk profile, but continued monitoring is recommended.`;
  } else if (riskLevel === 'medium') {
    summary += `Your symptom pattern indicates a moderate risk level that would benefit from lifestyle modifications and possibly medical consultation.`;
  } else if (riskLevel === 'high') {
    summary += `The severity and pattern of your symptoms indicate a high risk profile that requires medical attention and a comprehensive management plan.`;
  } else {
    summary += `Your symptoms indicate a very high risk profile that requires immediate medical attention and likely medication intervention along with lifestyle changes.`;
  }

  // Generate recommendations based on risk level and specific symptoms
  const recommendations = [];

  // Basic recommendations for everyone
  recommendations.push('Track your symptoms regularly in the PCOS Smart Insights app');
  recommendations.push('Maintain a balanced diet rich in fruits, vegetables, and whole grains');

  // Risk level based recommendations
  if (riskLevel === 'medium' || riskLevel === 'high' || riskLevel === 'very_high') {
    recommendations.push('Consider consulting with a healthcare provider at ' + medicalFacilities[Math.floor(Math.random() * medicalFacilities.length)]);
  }

  if (riskLevel === 'high' || riskLevel === 'very_high') {
    recommendations.push('Follow a low-glycemic diet to help manage insulin levels');
    recommendations.push('Aim for 150 minutes of moderate exercise weekly');
    recommendations.push('Consider having your hormone levels tested');
  }

  if (riskLevel === 'very_high') {
    recommendations.push('Discuss medication options with your healthcare provider');
    recommendations.push('Consider joining a PCOS support group in your area');
    recommendations.push('Schedule regular follow-ups with your gynecologist');
  }

  // Symptom-specific recommendations
  if (profile.symptomBias.irregularPeriods === 'moderate' || profile.symptomBias.irregularPeriods === 'severe') {
    recommendations.push('Track your menstrual cycle using the calendar feature');
    recommendations.push('Consider discussing hormonal regulation options with your doctor');
  }

  if (profile.symptomBias.acne === 'moderate' || profile.symptomBias.acne === 'severe') {
    recommendations.push('Consider consulting with a dermatologist for skincare advice');
    recommendations.push('Try a zinc supplement which may help with hormonal acne');
  }

  if (profile.symptomBias.weightGain === 'moderate' || profile.symptomBias.weightGain === 'severe') {
    recommendations.push('Consider working with a nutritionist for a personalized meal plan');
    recommendations.push('Focus on strength training in addition to cardio exercise');
    recommendations.push('Have your insulin resistance levels checked');
  }

  if (profile.symptomBias.fatigue === 'moderate' || profile.symptomBias.fatigue === 'severe') {
    recommendations.push('Have your iron and vitamin D levels checked');
    recommendations.push('Consider a sleep study to rule out sleep apnea, which is common with PCOS');
  }

  if (profile.symptomBias.hairLoss === 'moderate' || profile.symptomBias.hairLoss === 'severe') {
    recommendations.push('Consult with a trichologist or dermatologist specializing in hair loss');
    recommendations.push('Consider having your androgen levels tested');
  }

  // Create symptoms object with consistent severities based on user profile
  const symptoms = {};
  Object.keys(profile.symptomBias).forEach(symptom => {
    symptoms[symptom] = getWeightedSeverity(profile.symptomBias[symptom]);
  });

  return {
    user: userId,
    date: getRandomRecentDate(),
    score: score,
    riskLevel: riskLevel,
    summary: summary,
    details: {
      menstrualContribution,
      hormonalContribution,
      metabolicContribution
    },
    recommendations,
    symptoms
  };
};

// Function to generate calendar events with consistent patterns
const generateCalendarEvents = (userId, userIndex) => {
  const profile = userProfiles[userIndex];

  const eventTypes = [
    'period', 'symptom', 'medication', 'appointment', 'other'
  ];

  // Create period events based on menstrual regularity
  const periodEvents = [];
  const now = new Date();
  const threeMonthsAgo = new Date(now);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  // Determine cycle length based on irregularity
  let baseCycleLength = 28; // days
  let cycleVariation = 0;

  switch (profile.symptomBias.irregularPeriods) {
    case 'severe':
      cycleVariation = 10; // +/- 10 days variation
      break;
    case 'moderate':
      cycleVariation = 5; // +/- 5 days variation
      break;
    default:
      cycleVariation = 1; // +/- 1 day variation
  }

  // Start with a random date for the first period
  let periodDate = new Date(threeMonthsAgo.getTime() + Math.random() * 15 * 86400000); // Random start within first 15 days

  // Generate period events
  while (periodDate < now) {
    // Period start
    periodEvents.push({
      user: userId,
      date: new Date(periodDate),
      type: 'period',
      title: 'Period Started',
      note: profile.symptomBias.heavyBleeding === 'severe' ? 'Heavy flow' :
        profile.symptomBias.heavyBleeding === 'moderate' ? 'Moderate flow' : 'Light flow'
    });

    // Period end (typically 4-7 days later)
    const periodLength = Math.floor(Math.random() * 4) + 4; // 4-7 days
    const periodEndDate = new Date(periodDate);
    periodEndDate.setDate(periodEndDate.getDate() + periodLength);

    periodEvents.push({
      user: userId,
      date: periodEndDate,
      type: 'period',
      title: 'Period Ended',
      note: 'Last day'
    });

    // Calculate next period with variation
    const actualCycleLength = baseCycleLength + (Math.random() * cycleVariation * 2 - cycleVariation);
    periodDate.setDate(periodDate.getDate() + actualCycleLength);
  }

  // Generate medication events based on user profile - SIMPLIFIED
  const medicationEvents = [];

  // Determine which medications the user might be taking based on symptoms
  const userMedications = [];

  if (profile.symptomBias.irregularPeriods === 'moderate' || profile.symptomBias.irregularPeriods === 'severe') {
    // Hormonal birth control for menstrual regulation
    userMedications.push({
      medication: 'Birth Control Pill',
      dosage: '1 tablet',
      frequency: 'daily'
    });
  }

  if (profile.symptomBias.acne === 'severe' || profile.symptomBias.excessHairGrowth === 'severe') {
    // Spironolactone for hormonal symptoms
    userMedications.push({
      medication: 'Spironolactone',
      dosage: '100 mg',
      frequency: 'daily'
    });
  }

  if (profile.symptomBias.weightGain === 'severe' || profile.symptomBias.fatigue === 'severe') {
    // Metformin for metabolic symptoms
    userMedications.push({
      medication: 'Metformin',
      dosage: '500 mg',
      frequency: 'twice-daily'
    });
  }

  // Generate medication events for just the past month (instead of 3 months)
  const startDate = new Date(now);
  startDate.setMonth(startDate.getMonth() - 1);
  const endDate = new Date(now);

  // For each medication, create events based on frequency
  userMedications.forEach(med => {
    let currentDate = new Date(startDate);

    // Only create entries every 3 days to reduce data volume
    while (currentDate <= endDate) {
      if (currentDate.getDate() % 3 === 0) { // Only every 3 days
        medicationEvents.push({
          user: userId,
          date: new Date(currentDate),
          type: 'medication',
          title: `${med.medication} Taken`,
          note: `${med.dosage} dose`,
          medication: med.medication,
          dosage: med.dosage.split(' ')[0] // Just the amount
        });
      }

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  // Generate appointment events - SIMPLIFIED
  const appointmentEvents = [];

  // Just create 1-2 past appointments and 1 future appointment
  const numPastAppointments = Math.floor(Math.random() * 2) + 1; // 1-2 past appointments

  for (let i = 0; i < numPastAppointments; i++) {
    // Random date in past 3 months
    const appointmentDate = new Date(threeMonthsAgo.getTime() + Math.random() * (now - threeMonthsAgo));
    const facility = medicalFacilities[Math.floor(Math.random() * medicalFacilities.length)];

    // Determine appointment type based on symptoms
    let appointmentTitle = 'General PCOS Check-up';
    if (profile.symptomBias.irregularPeriods === 'severe') {
      appointmentTitle = 'Gynecologist Visit';
    } else if (profile.symptomBias.acne === 'severe') {
      appointmentTitle = 'Dermatologist Visit';
    } else if (profile.symptomBias.weightGain === 'severe') {
      appointmentTitle = 'Endocrinologist Visit';
    }

    appointmentEvents.push({
      user: userId,
      date: new Date(appointmentDate),
      type: 'appointment',
      title: appointmentTitle,
      note: `At ${facility}`
    });
  }

  // Add one future appointment
  const futureDate = new Date(now);
  futureDate.setDate(futureDate.getDate() + Math.floor(Math.random() * 30) + 1); // 1-30 days in future
  const futureAppointment = {
    user: userId,
    date: futureDate,
    type: 'appointment',
    title: 'Upcoming PCOS Follow-up',
    note: `At ${medicalFacilities[Math.floor(Math.random() * medicalFacilities.length)]}`
  };
  appointmentEvents.push(futureAppointment);

  // Generate other events (exercise, etc.) - SIMPLIFIED
  const otherEvents = [];
  const otherEventTitles = [
    'Yoga Session',
    'Cardio Workout',
    'Strength Training',
    'Meditation',
    'Nutrition Consultation',
    'PCOS Support Group Meeting'
  ];

  // Generate just 2-4 other events
  const numOtherEvents = Math.floor(Math.random() * 3) + 2;
  for (let i = 0; i < numOtherEvents; i++) {
    otherEvents.push({
      user: userId,
      date: new Date(threeMonthsAgo.getTime() + Math.random() * (now - threeMonthsAgo)),
      type: 'other',
      title: otherEventTitles[Math.floor(Math.random() * otherEventTitles.length)]
    });
  }

  // Combine all events
  return [...periodEvents, ...medicationEvents, ...appointmentEvents, ...otherEvents];
};

// Main function to load sample data
const loadSampleData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Assessment.deleteMany({});
    await Symptom.deleteMany({});
    await CalendarEvent.deleteMany({});

    console.log('Cleared existing data');

    // Create users
    const users = [];
    for (const userData of sampleUsers) {
      const user = await User.create({
        name: userData.name,
        email: userData.email,
        password: userData.password
      });
      users.push(user);
      console.log(`Created user: ${userData.name} (${userData.email})`);
    }

    // Create data for each user
    for (let i = 0; i < users.length; i++) {
      const user = users[i];

      // Create assessments (1-3 per user)
      const numAssessments = Math.floor(Math.random() * 2) + 1; // 1-2 assessments
      for (let j = 0; j < numAssessments; j++) {
        const assessmentData = generateAssessmentData(user._id, i);
        await Assessment.create(assessmentData);
      }
      console.log(`Created ${numAssessments} assessments for ${user.name}`);

      // Create symptoms
      const symptoms = generateSymptomData(user._id, i);
      if (symptoms.length > 0) {
        await Symptom.insertMany(symptoms);
        console.log(`Created ${symptoms.length} symptom entries for ${user.name}`);
      }

      // Create calendar events
      const events = generateCalendarEvents(user._id, i);
      if (events.length > 0) {
        await CalendarEvent.insertMany(events);
        console.log(`Created ${events.length} calendar events for ${user.name}`);
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
