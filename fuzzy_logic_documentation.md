# LAVIA: Fuzzy Logic in PCOS Smart Insights

## Overview

This document provides a comprehensive breakdown of how fuzzy logic is implemented in the LAVIA PCOS Smart Insights application to provide personalized health assessments.

---

## 1. Fuzzification

**Definition**: The process of converting crisp input values into fuzzy values (degrees of truth).

**Implementation in LAVIA PCOS Smart Insights**:
- Located in `frontend/src/lib/fuzzyLogic/fuzzification.ts`
- The `Fuzzifier` class converts discrete symptoms into fuzzy values (0-1 scale)

**Key Methods**:
```typescript
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
```

**Purpose**: Translates qualitative user inputs into quantitative values that can be processed by the fuzzy system.

---

## 2. Fuzzy Rules

**Definition**: A set of if-then rules that define the relationship between input and output variables.

**Implementation in LAVIA PCOS Smart Insights**:
- Located in `frontend/src/lib/fuzzyLogic/fuzzyRules.ts`
- The `FuzzyRuleEngine` class defines and evaluates the rule base

**Key Components**:
```typescript
// Definition of the weights for each symptom category
static readonly WEIGHTS = {
  menstrual: 0.35,
  hormonal: 0.35,
  metabolic: 0.30,
};

// Evaluate the hormonal factor based on fuzzy rules
static evaluateHormonalFactor(symptoms: Symptoms): number {
  const fuzzyValues = Fuzzifier.fuzzifySymptoms(symptoms);
  
  // Rule: Combine acne, hair loss, excessive hair growth and hormone levels
  return (
    fuzzyValues.acneFuzzy * 0.25 + 
    fuzzyValues.hairLossFuzzy * 0.25 + 
    fuzzyValues.hairGrowthFuzzy * 0.25 + 
    fuzzyValues.hormonesFuzzy * 0.25
  );
}
```

**Purpose**: Encodes medical knowledge about PCOS, determining how different symptoms contribute to the overall assessment.

---

## 3. Inference Engine

**Definition**: The component that applies fuzzy rules to inputs and aggregates the results.

**Implementation in LAVIA PCOS Smart Insights**:
- Located in `frontend/src/lib/fuzzyLogic/inferenceEngine.ts`
- The `FuzzyInferenceEngine` class applies rules and aggregates results

**Key Method**:
```typescript
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
```

**Purpose**: Handles the core reasoning process, determining how strongly the symptoms indicate PCOS based on the defined rules.

---

## 4. Defuzzification

**Definition**: The process of converting fuzzy output values back to crisp output values.

**Implementation in LAVIA PCOS Smart Insights**:
- Located in `frontend/src/lib/fuzzyLogic/defuzzification.ts`
- The `Defuzzifier` class converts fuzzy results to actionable outputs

**Key Methods**:
```typescript
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
  
  // Additional conditional recommendations...
  
  return recommendations;
}
```

**Purpose**: Transforms mathematical results into meaningful insights and actionable recommendations for users.

---

## System Integration

The entire fuzzy logic system is orchestrated by the `FuzzyPCOSSystem` class in `frontend/src/lib/fuzzyLogic/index.ts`:

```typescript
export class FuzzyPCOSSystem {
  // Main assessment method that orchestrates the fuzzy logic process
  public static assessPCOS(symptoms: Symptoms): PCOSAssessment {
    // 1. Fuzzification - Convert inputs to fuzzy values
    
    // 2. Rule evaluation & 3. Aggregation
    const inferenceResult = FuzzyInferenceEngine.inferRiskScore(symptoms);
    
    // 4. Defuzzification - Convert fuzzy result back to crisp output
    return Defuzzifier.defuzzify(symptoms, inferenceResult);
  }
}
```

This implementation allows the application to handle the inherent uncertainty in PCOS diagnosis, where symptoms exist on a spectrum rather than as binary values, providing users with more nuanced and personalized health insights.

---

## Benefits of Fuzzy Logic in PCOS Assessment

1. **Handles Uncertainty**: Recognizes that symptoms exist on a spectrum
2. **Personalized Analysis**: Provides individualized risk assessments
3. **Transparent Reasoning**: Shows contribution of different symptom categories
4. **Actionable Insights**: Generates tailored recommendations based on specific symptoms

---

*Document generated: April 6, 2025*  
*LAVIA Health - PCOS Smart Insights*  
* 2025 LAVIA Health Technologies*
