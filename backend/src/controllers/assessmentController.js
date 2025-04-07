const Assessment = require('../models/assessmentModel');

// Create a new assessment
exports.createAssessment = async (req, res) => {
  try {
    // Add user id to the request body
    req.body.user = req.user.id;
    
    // Map frontend form values to the expected assessment model format
    const {
      menstrualPattern,
      acneSeverity,
      hairLoss,
      excessiveHairGrowth,
      bmi,
      weightGain,
      skinTags,
      darkPatches,
      fatigue,
      moodChanges
    } = req.body;
    
    // Calculate scores based on the form values
    const menstrualScore = calculateMenstrualScore(menstrualPattern);
    const hormonalScore = calculateHormonalScore(acneSeverity, hairLoss, excessiveHairGrowth);
    const metabolicScore = calculateMetabolicScore(bmi, weightGain, skinTags, darkPatches);
    
    // Calculate overall risk score (weighted average)
    const overallRiskScore = (menstrualScore * 0.4) + (hormonalScore * 0.3) + (metabolicScore * 0.3);
    
    // Determine risk category based on overall score
    const riskCategory = getRiskCategory(overallRiskScore);
    
    // Generate recommendations based on symptoms and scores
    const recommendations = generateRecommendations({
      menstrualPattern,
      acneSeverity,
      hairLoss,
      excessiveHairGrowth,
      bmi,
      weightGain,
      skinTags,
      darkPatches,
      fatigue,
      moodChanges,
      menstrualScore,
      hormonalScore,
      metabolicScore,
      overallRiskScore
    });
    
    // Create assessment with mapped data
    const assessmentData = {
      user: req.user.id,
      score: overallRiskScore,
      riskLevel: riskCategory,
      details: {
        menstrualContribution: menstrualScore,
        hormonalContribution: hormonalScore,
        metabolicContribution: metabolicScore
      },
      recommendations,
      symptoms: {
        // Map menstrual symptoms
        irregularPeriods: menstrualPattern === 'regular' ? 'none' : 
                         menstrualPattern === 'irregular' ? 'mild' : 
                         menstrualPattern === 'very_irregular' ? 'moderate' : 'severe',
        heavyBleeding: 'none', // Default value since not in form
        missedPeriods: menstrualPattern === 'absent' ? 'severe' : 'none',
        
        // Map hormonal symptoms
        acne: acneSeverity,
        hairLoss,
        excessHairGrowth: excessiveHairGrowth,
        
        // Map metabolic symptoms
        weightGain,
        fatigue,
        cravings: 'none' // Default value since not in form
      }
    };
    
    const newAssessment = await Assessment.create(assessmentData);
    
    // Format the response to match what the frontend expects
    const formattedAssessment = {
      _id: newAssessment._id,
      user: newAssessment.user,
      menstrualScore: newAssessment.details.menstrualContribution,
      hormonalScore: newAssessment.details.hormonalContribution,
      metabolicScore: newAssessment.details.metabolicContribution,
      overallRiskScore: newAssessment.score,
      riskCategory: newAssessment.riskLevel,
      recommendations: newAssessment.recommendations,
      createdAt: newAssessment.createdAt,
      updatedAt: newAssessment.updatedAt
    };
    
    res.status(201).json({
      status: 'success',
      data: {
        assessment: formattedAssessment
      }
    });
  } catch (error) {
    console.error('Error creating assessment:', error);
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Helper functions for assessment calculations
function calculateMenstrualScore(menstrualPattern) {
  switch (menstrualPattern) {
    case 'regular': return 0.1;
    case 'irregular': return 0.4;
    case 'very_irregular': return 0.7;
    case 'absent': return 0.9;
    default: return 0.1;
  }
}

function calculateHormonalScore(acneSeverity, hairLoss, excessiveHairGrowth) {
  const acneScore = getSeverityScore(acneSeverity);
  const hairLossScore = getSeverityScore(hairLoss);
  const hairGrowthScore = getSeverityScore(excessiveHairGrowth);
  
  return (acneScore + hairLossScore + hairGrowthScore) / 3;
}

function calculateMetabolicScore(bmi, weightGain, skinTags, darkPatches) {
  const bmiScore = getBmiScore(bmi);
  const weightGainScore = getSeverityScore(weightGain);
  const skinTagsScore = getSeverityScore(skinTags);
  const darkPatchesScore = getSeverityScore(darkPatches);
  
  return (bmiScore + weightGainScore + skinTagsScore + darkPatchesScore) / 4;
}

function getSeverityScore(severity) {
  switch (severity) {
    case 'none': return 0.1;
    case 'mild': return 0.4;
    case 'moderate': return 0.7;
    case 'severe': return 0.9;
    default: return 0.1;
  }
}

function getBmiScore(bmi) {
  if (bmi < 18.5) return 0.3; // Underweight
  if (bmi < 25) return 0.1;   // Normal
  if (bmi < 30) return 0.5;   // Overweight
  if (bmi < 35) return 0.7;   // Obese
  return 0.9;                 // Severely obese
}

function getRiskCategory(score) {
  if (score < 0.3) return 'low';
  if (score < 0.5) return 'medium';
  if (score < 0.7) return 'high';
  return 'very_high';
}

function generateRecommendations(data) {
  const recommendations = [];
  
  // Menstrual recommendations
  if (data.menstrualPattern !== 'regular') {
    recommendations.push('Track your menstrual cycle regularly to identify patterns and irregularities.');
    
    if (data.menstrualPattern === 'absent' || data.menstrualPattern === 'very_irregular') {
      recommendations.push('Consult with a gynecologist or endocrinologist about your irregular menstrual cycles.');
    }
  }
  
  // Hormonal recommendations
  if (data.acneSeverity !== 'none' || data.hairLoss !== 'none' || data.excessiveHairGrowth !== 'none') {
    recommendations.push('Consider hormone-balancing lifestyle changes including regular exercise and stress management.');
    
    if (data.acneSeverity === 'moderate' || data.acneSeverity === 'severe') {
      recommendations.push('Establish a consistent skincare routine with products designed for hormonal acne.');
    }
  }
  
  // Metabolic recommendations
  if (data.bmi >= 25) {
    recommendations.push('Focus on a balanced diet rich in whole foods, lean proteins, and complex carbohydrates.');
    recommendations.push('Aim for 150 minutes of moderate-intensity exercise per week.');
  }
  
  if (data.weightGain === 'moderate' || data.weightGain === 'severe') {
    recommendations.push('Consider consulting with a nutritionist who specializes in PCOS management.');
  }
  
  // General recommendations
  recommendations.push('Stay hydrated by drinking at least 8 glasses of water daily.');
  
  if (data.fatigue === 'moderate' || data.fatigue === 'severe') {
    recommendations.push('Prioritize quality sleep with a consistent sleep schedule of 7-9 hours per night.');
  }
  
  if (data.moodChanges === 'moderate' || data.moodChanges === 'severe') {
    recommendations.push('Practice mindfulness or meditation to help manage stress and mood fluctuations.');
  }
  
  // Limit to 5 most relevant recommendations
  return recommendations.slice(0, 5);
}

// Get all assessments for the current user
exports.getMyAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({ user: req.user.id })
      .sort({ date: -1 });
    
    res.status(200).json({
      status: 'success',
      results: assessments.length,
      data: {
        assessments
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Get assessments for a specific date range
exports.getAssessmentsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide startDate and endDate'
      });
    }
    
    const assessments = await Assessment.find({
      user: req.user.id,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).sort({ date: -1 });
    
    res.status(200).json({
      status: 'success',
      results: assessments.length,
      data: {
        assessments
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Get the latest assessment for the current user
exports.getLatestAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findOne({ user: req.user.id })
      .sort({ date: -1 });
    
    if (!assessment) {
      return res.status(404).json({
        status: 'fail',
        message: 'No assessment found for this user'
      });
    }
    
    // Format the response to match what the frontend expects
    const formattedAssessment = {
      _id: assessment._id,
      user: assessment.user,
      menstrualScore: assessment.details.menstrualContribution,
      hormonalScore: assessment.details.hormonalContribution,
      metabolicScore: assessment.details.metabolicContribution,
      overallRiskScore: assessment.score,
      riskCategory: assessment.riskLevel,
      recommendations: assessment.recommendations,
      createdAt: assessment.createdAt,
      updatedAt: assessment.updatedAt
    };
    
    res.status(200).json({
      status: 'success',
      data: {
        assessment: formattedAssessment
      }
    });
  } catch (error) {
    console.error('Error fetching latest assessment:', error);
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Get a specific assessment
exports.getAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!assessment) {
      return res.status(404).json({
        status: 'fail',
        message: 'No assessment found with that ID'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        assessment
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
