
import { SymptomSeverity, MenstrualPattern, BMICategory, HormoneLevels, Symptoms, FuzzyValue } from './types';

// Fuzzification component - converts crisp inputs to fuzzy values
export class Fuzzifier {
  // Convert symptom severity to fuzzy value
  static fuzzifySeverity(severity: SymptomSeverity): number {
    switch (severity) {
      case 'none': return 0;
      case 'mild': return 0.33;
      case 'moderate': return 0.67;
      case 'severe': return 1;
      default: return 0;
    }
  }

  // Convert menstrual pattern to fuzzy value
  static fuzzifyMenstrualPattern(pattern: MenstrualPattern): number {
    switch (pattern) {
      case 'regular': return 0;
      case 'irregular': return 0.4;
      case 'very_irregular': return 0.8;
      case 'absent': return 1;
      default: return 0;
    }
  }

  // Convert BMI category to fuzzy value
  static fuzzifyBMI(category: BMICategory): number {
    switch (category) {
      case 'underweight': return 0.3;
      case 'normal': return 0;
      case 'overweight': return 0.6;
      case 'obese': return 1;
      default: return 0;
    }
  }

  // Convert hormone levels to fuzzy value
  static fuzzifyHormones(level: HormoneLevels): number {
    switch (level) {
      case 'normal': return 0;
      case 'slightly_elevated': return 0.33;
      case 'elevated': return 0.67;
      case 'highly_elevated': return 1;
      default: return 0;
    }
  }

  // Convert all symptoms to fuzzy values
  static fuzzifySymptoms(symptoms: Symptoms): {
    menstrualFuzzy: number;
    acneFuzzy: number;
    hairLossFuzzy: number;
    hairGrowthFuzzy: number;
    weightGainFuzzy: number;
    skinTagsFuzzy: number;
    darkPatchesFuzzy: number;
    bmiFuzzy: number;
    hormonesFuzzy: number;
  } {
    // Calculate hormones fuzzy value
    const acneFuzzy = this.fuzzifySeverity(symptoms.acneSeverity);
    const hairLossFuzzy = this.fuzzifySeverity(symptoms.hairLoss);
    const hairGrowthFuzzy = this.fuzzifySeverity(symptoms.excessiveHairGrowth);
    
    let hormonesFuzzy: number;
    if (symptoms.hormoneLevels) {
      hormonesFuzzy = this.fuzzifyHormones(symptoms.hormoneLevels);
    } else {
      // Derive from symptoms if not explicitly provided
      hormonesFuzzy = (acneFuzzy + hairLossFuzzy + hairGrowthFuzzy) / 3;
    }

    return {
      menstrualFuzzy: this.fuzzifyMenstrualPattern(symptoms.menstrualPattern),
      acneFuzzy,
      hairLossFuzzy,
      hairGrowthFuzzy,
      weightGainFuzzy: this.fuzzifySeverity(symptoms.weightGain),
      skinTagsFuzzy: this.fuzzifySeverity(symptoms.skinTags),
      darkPatchesFuzzy: this.fuzzifySeverity(symptoms.darkPatches),
      bmiFuzzy: this.fuzzifyBMI(symptoms.bmi),
      hormonesFuzzy
    };
  }
}
