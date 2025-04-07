
import { Symptoms } from './types';
import { FuzzyRuleEngine } from './fuzzyRules';

// Inference engine component - applies fuzzy rules and computes the aggregated result
export class FuzzyInferenceEngine {
  // Aggregate all factors with their weights to produce a final fuzzy score
  static inferRiskScore(symptoms: Symptoms): {
    score: number;
    menstrualContribution: number;
    hormonalContribution: number;
    metabolicContribution: number;
  } {
    // Calculate individual factors using the rule engine
    const menstrualFactor = FuzzyRuleEngine.evaluateMenstrualFactor(symptoms);
    const hormonalFactor = FuzzyRuleEngine.evaluateHormonalFactor(symptoms);
    const metabolicFactor = FuzzyRuleEngine.evaluateMetabolicFactor(symptoms);
    
    // Calculate the weighted contributions
    const menstrualContribution = menstrualFactor * FuzzyRuleEngine.WEIGHTS.menstrual;
    const hormonalContribution = hormonalFactor * FuzzyRuleEngine.WEIGHTS.hormonal;
    const metabolicContribution = metabolicFactor * FuzzyRuleEngine.WEIGHTS.metabolic;
    
    // Aggregate to get the final score
    const score = menstrualContribution + hormonalContribution + metabolicContribution;
    
    return {
      score,
      menstrualContribution,
      hormonalContribution,
      metabolicContribution
    };
  }
}
