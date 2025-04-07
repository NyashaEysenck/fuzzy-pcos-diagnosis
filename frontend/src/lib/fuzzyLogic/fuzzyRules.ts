
import { Symptoms } from './types';
import { Fuzzifier } from './fuzzification';

// Fuzzy rules component - contains the rule definitions and evaluation
export class FuzzyRuleEngine {
  // Definition of the weights for each symptom category
  static readonly WEIGHTS = {
    menstrual: 0.35,
    hormonal: 0.35,
    metabolic: 0.30,
  };

  // Evaluate the menstrual factor based on fuzzy rules
  static evaluateMenstrualFactor(symptoms: Symptoms): number {
    // Direct mapping from menstrual pattern to fuzzy value
    return Fuzzifier.fuzzifyMenstrualPattern(symptoms.menstrualPattern);
  }

  // Evaluate the hormonal factor based on fuzzy rules
  static evaluateHormonalFactor(symptoms: Symptoms): number {
    const fuzzyValues = Fuzzifier.fuzzifySymptoms(symptoms);
    
    // Rule: Combine acne, hair loss, excessive hair growth and hormone levels with equal weights
    return (
      fuzzyValues.acneFuzzy * 0.25 + 
      fuzzyValues.hairLossFuzzy * 0.25 + 
      fuzzyValues.hairGrowthFuzzy * 0.25 + 
      fuzzyValues.hormonesFuzzy * 0.25
    );
  }

  // Evaluate the metabolic factor based on fuzzy rules
  static evaluateMetabolicFactor(symptoms: Symptoms): number {
    const fuzzyValues = Fuzzifier.fuzzifySymptoms(symptoms);
    
    // Rule: BMI has higher importance, followed by weight gain, skin tags and dark patches
    return (
      fuzzyValues.bmiFuzzy * 0.4 + 
      fuzzyValues.weightGainFuzzy * 0.3 + 
      fuzzyValues.skinTagsFuzzy * 0.15 + 
      fuzzyValues.darkPatchesFuzzy * 0.15
    );
  }
}
