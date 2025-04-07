
import { PCOSRisk, Symptoms, PCOSAssessment } from './types';
import { FuzzyInferenceEngine } from './inferenceEngine';

// Defuzzification component - converts fuzzy result back to crisp output
export class Defuzzifier {
  // Map a numerical score to a risk level category
  static mapScoreToRiskLevel(score: number): PCOSRisk {
    if (score < 0.3) return 'low';
    if (score < 0.5) return 'medium';
    if (score < 0.7) return 'high';
    return 'very_high';
  }

  // Generate appropriate recommendations based on symptoms and risk score
  static generateRecommendations(symptoms: Symptoms, score: number): string[] {
    const recommendations: string[] = [];
    
    if (score >= 0.5) {
      recommendations.push("Consider consulting with a healthcare provider for a professional PCOS evaluation.");
    }
    
    if (symptoms.menstrualPattern !== 'regular') {
      recommendations.push("Track your menstrual cycle with our calendar tool to identify patterns.");
    }
    
    if (symptoms.bmi === 'overweight' || symptoms.bmi === 'obese') {
      recommendations.push("Aim for regular physical activity (30 minutes daily) and consider consulting a nutritionist.");
    }
    
    if (symptoms.acneSeverity === 'moderate' || symptoms.acneSeverity === 'severe') {
      recommendations.push("Consider a dermatologist consultation for acne management strategies.");
    }
    
    if (symptoms.moodChanges === 'moderate' || symptoms.moodChanges === 'severe') {
      recommendations.push("Incorporate stress-reduction techniques like meditation or yoga into your routine.");
    }
    
    if (symptoms.fatigue === 'moderate' || symptoms.fatigue === 'severe') {
      recommendations.push("Prioritize quality sleep and consider having your vitamin D and B12 levels checked.");
    }
    
    if (recommendations.length === 0) {
      recommendations.push("Continue monitoring your symptoms and maintain a healthy lifestyle.");
    }
    
    return recommendations;
  }

  // Convert the fuzzy inference result to a final assessment result
  static defuzzify(symptoms: Symptoms, inferenceResult: ReturnType<typeof FuzzyInferenceEngine.inferRiskScore>): PCOSAssessment {
    const riskLevel = this.mapScoreToRiskLevel(inferenceResult.score);
    const recommendations = this.generateRecommendations(symptoms, inferenceResult.score);
    
    return {
      riskLevel,
      score: inferenceResult.score,
      details: {
        menstrualContribution: inferenceResult.menstrualContribution,
        hormonalContribution: inferenceResult.hormonalContribution,
        metabolicContribution: inferenceResult.metabolicContribution,
      },
      recommendations
    };
  }
}
