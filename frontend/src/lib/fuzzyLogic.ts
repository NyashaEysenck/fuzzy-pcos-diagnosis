
// Types for our system
export type SymptomSeverity = 'none' | 'mild' | 'moderate' | 'severe';
export type MenstrualPattern = 'regular' | 'irregular' | 'very_irregular' | 'absent';
export type BMICategory = 'underweight' | 'normal' | 'overweight' | 'obese';
export type HormoneLevels = 'normal' | 'slightly_elevated' | 'elevated' | 'highly_elevated';
export type PCOSRisk = 'low' | 'medium' | 'high' | 'very_high';

export interface Symptoms {
  menstrualPattern: MenstrualPattern;
  acneSeverity: SymptomSeverity;
  hairLoss: SymptomSeverity;
  excessiveHairGrowth: SymptomSeverity;
  weightGain: SymptomSeverity;
  skinTags: SymptomSeverity;
  darkPatches: SymptomSeverity;
  fatigue: SymptomSeverity;
  moodChanges: SymptomSeverity;
  bmi: BMICategory;
  hormoneLevels?: HormoneLevels;
}

export interface PCOSAssessment {
  riskLevel: PCOSRisk;
  score: number;
  details: {
    menstrualContribution: number;
    hormonalContribution: number;
    metabolicContribution: number;
  };
  recommendations: string[];
}

// Fuzzy Logic System Implementation
export class FuzzyPCOSSystem {
  // Weight factors for different symptom categories
  private static readonly WEIGHTS = {
    menstrual: 0.35,
    hormonal: 0.35,
    metabolic: 0.30,
  };

  // Map symptom severities to numerical values
  private static getSeverityValue(severity: SymptomSeverity): number {
    switch (severity) {
      case 'none': return 0;
      case 'mild': return 0.33;
      case 'moderate': return 0.67;
      case 'severe': return 1;
      default: return 0;
    }
  }

  // Map menstrual patterns to numerical values
  private static getMenstrualValue(pattern: MenstrualPattern): number {
    switch (pattern) {
      case 'regular': return 0;
      case 'irregular': return 0.4;
      case 'very_irregular': return 0.8;
      case 'absent': return 1;
      default: return 0;
    }
  }

  // Map BMI categories to numerical values
  private static getBMIValue(category: BMICategory): number {
    switch (category) {
      case 'underweight': return 0.3;
      case 'normal': return 0;
      case 'overweight': return 0.6;
      case 'obese': return 1;
      default: return 0;
    }
  }

  // Map hormone levels to numerical values
  private static getHormoneValue(level: HormoneLevels): number {
    switch (level) {
      case 'normal': return 0;
      case 'slightly_elevated': return 0.33;
      case 'elevated': return 0.67;
      case 'highly_elevated': return 1;
      default: return 0;
    }
  }

  // Calculate menstrual factor
  private static calculateMenstrualFactor(symptoms: Symptoms): number {
    return this.getMenstrualValue(symptoms.menstrualPattern);
  }

  // Calculate hormonal factor
  private static calculateHormonalFactor(symptoms: Symptoms): number {
    const acneValue = this.getSeverityValue(symptoms.acneSeverity);
    const hairLossValue = this.getSeverityValue(symptoms.hairLoss);
    const excessiveHairValue = this.getSeverityValue(symptoms.excessiveHairGrowth);
    const hormoneValue = symptoms.hormoneLevels 
      ? this.getHormoneValue(symptoms.hormoneLevels) 
      : (acneValue + hairLossValue + excessiveHairValue) / 3;
    
    return (acneValue * 0.25 + hairLossValue * 0.25 + excessiveHairValue * 0.25 + hormoneValue * 0.25);
  }

  // Calculate metabolic factor
  private static calculateMetabolicFactor(symptoms: Symptoms): number {
    const bmiValue = this.getBMIValue(symptoms.bmi);
    const weightGainValue = this.getSeverityValue(symptoms.weightGain);
    const skinTagsValue = this.getSeverityValue(symptoms.skinTags);
    const darkPatchesValue = this.getSeverityValue(symptoms.darkPatches);
    
    return (bmiValue * 0.4 + weightGainValue * 0.3 + skinTagsValue * 0.15 + darkPatchesValue * 0.15);
  }

  // Map numerical score to risk level
  private static mapScoreToRiskLevel(score: number): PCOSRisk {
    if (score < 0.3) return 'low';
    if (score < 0.5) return 'medium';
    if (score < 0.7) return 'high';
    return 'very_high';
  }

  // Generate recommendations based on symptoms and score
  private static generateRecommendations(symptoms: Symptoms, score: number): string[] {
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

  // Main assessment method
  public static assessPCOS(symptoms: Symptoms): PCOSAssessment {
    // Calculate individual factors
    const menstrualFactor = this.calculateMenstrualFactor(symptoms);
    const hormonalFactor = this.calculateHormonalFactor(symptoms);
    const metabolicFactor = this.calculateMetabolicFactor(symptoms);
    
    // Calculate weighted score
    const score = 
      menstrualFactor * this.WEIGHTS.menstrual +
      hormonalFactor * this.WEIGHTS.hormonal +
      metabolicFactor * this.WEIGHTS.metabolic;
    
    // Map score to risk level
    const riskLevel = this.mapScoreToRiskLevel(score);
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(symptoms, score);
    
    return {
      riskLevel,
      score,
      details: {
        menstrualContribution: menstrualFactor * this.WEIGHTS.menstrual,
        hormonalContribution: hormonalFactor * this.WEIGHTS.hormonal,
        metabolicContribution: metabolicFactor * this.WEIGHTS.metabolic,
      },
      recommendations,
    };
  }
}

// Sample symptoms for testing
export const defaultSymptoms: Symptoms = {
  menstrualPattern: 'regular',
  acneSeverity: 'none',
  hairLoss: 'none',
  excessiveHairGrowth: 'none',
  weightGain: 'none',
  skinTags: 'none',
  darkPatches: 'none',
  fatigue: 'none',
  moodChanges: 'none',
  bmi: 'normal',
};

// BMI calculator function
export const calculateBMICategory = (weightKg: number, heightCm: number): BMICategory => {
  if (heightCm <= 0) return 'normal';
  
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
};
