
import { Symptoms, PCOSAssessment, PCOSRisk, MenstrualPattern, SymptomSeverity, BMICategory, HormoneLevels, FuzzyValue } from './types';
import { Fuzzifier } from './fuzzification';
import { FuzzyRuleEngine } from './fuzzyRules';
import { FuzzyInferenceEngine } from './inferenceEngine';
import { Defuzzifier } from './defuzzification';

// Main fuzzy logic system class that orchestrates the whole process
export class FuzzyPCOSSystem {
  // Main assessment method that orchestrates the fuzzy logic process
  public static assessPCOS(symptoms: Symptoms): PCOSAssessment {
    // 1. Fuzzification - Convert inputs to fuzzy values (implicit in inference engine)
    
    // 2. Rule evaluation & 3. Aggregation - Apply fuzzy rules and aggregate results
    const inferenceResult = FuzzyInferenceEngine.inferRiskScore(symptoms);
    
    // 4. Defuzzification - Convert fuzzy result back to crisp output
    return Defuzzifier.defuzzify(symptoms, inferenceResult);
  }
}

// Export default symptoms for testing/initialization
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

// Export all types and components for use elsewhere in the application
export type { 
  Symptoms, 
  PCOSAssessment, 
  PCOSRisk, 
  MenstrualPattern, 
  SymptomSeverity, 
  BMICategory, 
  HormoneLevels,
  FuzzyValue
};

export { 
  Fuzzifier,
  FuzzyRuleEngine,
  FuzzyInferenceEngine,
  Defuzzifier
};
