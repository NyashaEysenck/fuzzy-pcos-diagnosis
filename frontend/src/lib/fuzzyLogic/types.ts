
// Basic types for our PCOS fuzzy system
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

// Fuzzy value representation
export interface FuzzyValue {
  label: string;
  membershipDegree: number;
}
