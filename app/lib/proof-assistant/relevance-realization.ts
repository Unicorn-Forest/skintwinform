/**
 * Relevance Realization System for SKIN-TWIN Proof Assistant
 *
 * Implements the triadic architecture of relevance realization:
 * - Salience detection
 * - Coherence assessment
 * - Elegance evaluation
 */

import type { RelevanceRealizationContext, ProofStep, Evidence, CognitiveState } from './types';

interface SaliencePattern {
  id: string;
  pattern: RegExp | ((text: string) => boolean);
  weight: number;
  category: 'ingredient' | 'effect' | 'safety' | 'interaction' | 'mechanism';
}

interface CoherenceRule {
  id: string;
  condition: (steps: ProofStep[]) => boolean;
  coherenceBoost: number;
  description: string;
}

interface EleganceMetric {
  id: string;
  calculate: (step: ProofStep) => number;
  weight: number;
  description: string;
}

/**
 * Implements John Vervaeke's relevance realization framework
 * for cognitive proof assistant reasoning
 */
export class RelevanceRealizationSystem {
  private saliencePatterns: SaliencePattern[] = [];
  private coherenceRules: CoherenceRule[] = [];
  private eleganceMetrics: EleganceMetric[] = [];
  private contextHistory: RelevanceRealizationContext[];
  private maxHistorySize: number;

  constructor(maxHistorySize: number = 10) {
    this.maxHistorySize = maxHistorySize;
    this.contextHistory = [];
    this.initializeSaliencePatterns();
    this.initializeCoherenceRules();
    this.initializeEleganceMetrics();
  }

  /**
   * Apply relevance realization to filter and prioritize proof steps
   */
  realizeRelevance(
    candidateSteps: ProofStep[],
    context: RelevanceRealizationContext,
    cognitiveState: CognitiveState,
  ): {
    relevantSteps: ProofStep[];
    salienceScores: Map<string, number>;
    coherenceScores: Map<string, number>;
    eleganceScores: Map<string, number>;
    overallRelevance: Map<string, number>;
  } {
    // Update context history
    this.updateContextHistory(context);

    // Phase 1: Salience Detection
    const salienceScores = this.detectSalience(candidateSteps, context, cognitiveState);

    // Phase 2: Coherence Assessment
    const coherenceScores = this.assessCoherence(candidateSteps, context);

    // Phase 3: Elegance Evaluation
    const eleganceScores = this.evaluateElegance(candidateSteps);

    // Phase 4: Integration and Prioritization
    const overallRelevance = this.integrateRelevanceDimensions(salienceScores, coherenceScores, eleganceScores);

    // Filter and sort by overall relevance
    const relevantSteps = candidateSteps
      .filter((step) => overallRelevance.get(step.id)! > 0.3)
      .sort((a, b) => overallRelevance.get(b.id)! - overallRelevance.get(a.id)!);

    return {
      relevantSteps,
      salienceScores,
      coherenceScores,
      eleganceScores,
      overallRelevance,
    };
  }

  /**
   * Detect salience in proof steps based on context and patterns
   */
  private detectSalience(
    steps: ProofStep[],
    context: RelevanceRealizationContext,
    cognitiveState: CognitiveState,
  ): Map<string, number> {
    const salienceScores = new Map<string, number>();

    for (const step of steps) {
      let totalSalience = 0;

      // Pattern-based salience detection
      for (const pattern of this.saliencePatterns) {
        const matches = this.matchesPattern(step.statement, pattern);

        if (matches) {
          totalSalience += pattern.weight;
        }
      }

      // Context-based salience
      const contextSalience = this.calculateContextualSalience(step, context);
      totalSalience += contextSalience;

      // Cognitive state-based salience
      const cognitiveSalience = this.calculateCognitiveSalience(step, cognitiveState);
      totalSalience += cognitiveSalience;

      // Attention-based salience
      const attentionSalience = this.calculateAttentionalSalience(step, cognitiveState);
      totalSalience += attentionSalience;

      salienceScores.set(step.id, Math.min(totalSalience, 1.0));
    }

    return salienceScores;
  }

  /**
   * Assess coherence of proof steps within the logical structure
   */
  private assessCoherence(steps: ProofStep[], context: RelevanceRealizationContext): Map<string, number> {
    const coherenceScores = new Map<string, number>();

    for (const step of steps) {
      let coherenceScore = 0.5; // Base coherence

      // Rule-based coherence assessment
      for (const rule of this.coherenceRules) {
        if (rule.condition([step, ...steps.filter((s) => s.id !== step.id)])) {
          coherenceScore += rule.coherenceBoost;
        }
      }

      // Logical dependency coherence
      const dependencyCoherence = this.calculateDependencyCoherence(step, steps);
      coherenceScore += dependencyCoherence;

      // Narrative coherence (does it fit the story)
      const narrativeCoherence = this.calculateNarrativeCoherence(step, context);
      coherenceScore += narrativeCoherence;

      // Temporal coherence
      const temporalCoherence = this.calculateTemporalCoherence(step, steps);
      coherenceScore += temporalCoherence;

      coherenceScores.set(step.id, Math.min(coherenceScore, 1.0));
    }

    return coherenceScores;
  }

  /**
   * Evaluate elegance of proof steps
   */
  private evaluateElegance(steps: ProofStep[]): Map<string, number> {
    const eleganceScores = new Map<string, number>();

    for (const step of steps) {
      let eleganceScore = 0;

      // Apply elegance metrics
      for (const metric of this.eleganceMetrics) {
        const metricScore = metric.calculate(step);
        eleganceScore += metricScore * metric.weight;
      }

      eleganceScores.set(step.id, Math.min(eleganceScore, 1.0));
    }

    return eleganceScores;
  }

  /**
   * Integrate the three dimensions of relevance realization
   */
  private integrateRelevanceDimensions(
    salience: Map<string, number>,
    coherence: Map<string, number>,
    elegance: Map<string, number>,
  ): Map<string, number> {
    const integrated = new Map<string, number>();

    // Weighted combination of the three dimensions
    const salienceWeight = 0.4;
    const coherenceWeight = 0.4;
    const eleganceWeight = 0.2;

    for (const stepId of salience.keys()) {
      const s = salience.get(stepId) || 0;
      const c = coherence.get(stepId) || 0;
      const e = elegance.get(stepId) || 0;

      const overallRelevance = s * salienceWeight + c * coherenceWeight + e * eleganceWeight;
      integrated.set(stepId, overallRelevance);
    }

    return integrated;
  }

  // Salience calculation methods

  private matchesPattern(text: string, pattern: SaliencePattern): boolean {
    if (pattern.pattern instanceof RegExp) {
      return pattern.pattern.test(text);
    } else {
      return pattern.pattern(text);
    }
  }

  private calculateContextualSalience(step: ProofStep, context: RelevanceRealizationContext): number {
    let salience = 0;

    // Goal alignment
    if (step.statement.toLowerCase().includes(context.currentGoal.toLowerCase())) {
      salience += 0.3;
    }

    // Active ingredient relevance
    const relevantIngredients = context.activeIngredients.filter((ing) =>
      step.statement.toLowerCase().includes(ing.toLowerCase()),
    );
    salience += relevantIngredients.length * 0.1;

    // Skin condition relevance
    if (step.statement.toLowerCase().includes(context.skinCondition.toLowerCase())) {
      salience += 0.2;
    }

    // Constraint relevance
    const relevantConstraints = context.userConstraints.filter((constraint) =>
      step.statement.toLowerCase().includes(constraint.toLowerCase()),
    );
    salience += relevantConstraints.length * 0.05;

    return Math.min(salience, 0.8);
  }

  private calculateCognitiveSalience(step: ProofStep, cognitiveState: CognitiveState): number {
    let salience = 0;

    // Memory activation salience
    for (const [key, activation] of cognitiveState.memoryActivation) {
      if (step.statement.toLowerCase().includes(key.toLowerCase())) {
        salience += Math.min(activation / 1000000, 0.2); // Normalize timestamp
      }
    }

    // Relevance weight salience
    for (const [key, weight] of cognitiveState.relevanceWeights) {
      if (step.statement.toLowerCase().includes(key.toLowerCase())) {
        salience += weight * 0.1;
      }
    }

    return Math.min(salience, 0.5);
  }

  private calculateAttentionalSalience(step: ProofStep, cognitiveState: CognitiveState): number {
    let salience = 0;

    for (const focusItem of cognitiveState.attentionalFocus) {
      if (step.statement.toLowerCase().includes(focusItem.toLowerCase())) {
        salience += 0.15;
      }
    }

    return Math.min(salience, 0.6);
  }

  // Coherence calculation methods

  private calculateDependencyCoherence(step: ProofStep, allSteps: ProofStep[]): number {
    let coherence = 0;

    // Check if premises exist in other steps
    const premisesSatisfied = step.premises.filter((premise) =>
      allSteps.some((s) => s.id === premise || s.statement.includes(premise)),
    );

    coherence += (premisesSatisfied.length / Math.max(step.premises.length, 1)) * 0.3;

    // Check if this step supports other steps
    const supportsOthers = allSteps.filter(
      (s) => s.premises.includes(step.id) || s.statement.includes(step.statement.slice(0, 20)),
    );

    coherence += Math.min(supportsOthers.length * 0.1, 0.2);

    return coherence;
  }

  private calculateNarrativeCoherence(step: ProofStep, context: RelevanceRealizationContext): number {
    // Check if step fits the overall narrative flow
    let coherence = 0;

    const stepType = step.type;
    const statement = step.statement.toLowerCase();

    // Narrative flow assessment
    if (stepType === 'assumption' && statement.includes('assume')) {
      coherence += 0.2;
    }

    if (stepType === 'verification' && (statement.includes('verify') || statement.includes('check'))) {
      coherence += 0.2;
    }

    if (stepType === 'conclusion' && statement.includes('therefore')) {
      coherence += 0.2;
    }

    // Context consistency
    if (statement.includes(context.skinCondition.toLowerCase())) {
      coherence += 0.1;
    }

    return coherence;
  }

  private calculateTemporalCoherence(step: ProofStep, allSteps: ProofStep[]): number {
    // Ensure logical temporal ordering
    let coherence = 0.2; // Base temporal coherence

    const stepTime = this.extractTimeFromId(step.id);

    // Check if dependencies come before this step
    for (const premise of step.premises) {
      const premiseStep = allSteps.find((s) => s.id === premise);

      if (premiseStep) {
        const premiseTime = this.extractTimeFromId(premiseStep.id);

        if (premiseTime < stepTime) {
          coherence += 0.1;
        }
      }
    }

    return Math.min(coherence, 0.5);
  }

  // Initialization methods

  private initializeSaliencePatterns(): void {
    this.saliencePatterns = [
      {
        id: 'ingredient_mention',
        pattern: /ingredient|compound|chemical|molecule/i,
        weight: 0.2,
        category: 'ingredient',
      },
      {
        id: 'effect_mention',
        pattern: /effect|benefit|improve|enhance|reduce|increase/i,
        weight: 0.25,
        category: 'effect',
      },
      {
        id: 'safety_mention',
        pattern: /safe|safety|toxic|harm|risk|danger/i,
        weight: 0.3,
        category: 'safety',
      },
      {
        id: 'interaction_mention',
        pattern: /interact|synerg|antagon|compatible|incompatible/i,
        weight: 0.2,
        category: 'interaction',
      },
      {
        id: 'mechanism_mention',
        pattern: /mechanism|pathway|process|reaction|binding/i,
        weight: 0.15,
        category: 'mechanism',
      },
      {
        id: 'skin_layer_mention',
        pattern: /epidermis|dermis|subcutaneous|stratum|barrier/i,
        weight: 0.25,
        category: 'effect',
      },
      {
        id: 'penetration_mention',
        pattern: /penetrat|absorb|permeab|transport|diffus/i,
        weight: 0.2,
        category: 'mechanism',
      },
    ];
  }

  private initializeCoherenceRules(): void {
    this.coherenceRules = [
      {
        id: 'assumption_before_conclusion',
        condition: (steps) => {
          const hasAssumption = steps.some((s) => s.type === 'assumption');
          const hasConclusion = steps.some((s) => s.type === 'conclusion');

          return hasAssumption && hasConclusion;
        },
        coherenceBoost: 0.2,
        description: 'Proper logical flow from assumptions to conclusions',
      },
      {
        id: 'verification_supports_conclusion',
        condition: (steps) => {
          const verificationSteps = steps.filter((s) => s.type === 'verification');
          const conclusionSteps = steps.filter((s) => s.type === 'conclusion');

          return verificationSteps.length > 0 && conclusionSteps.length > 0;
        },
        coherenceBoost: 0.15,
        description: 'Verification steps support conclusions',
      },
      {
        id: 'consistent_confidence_levels',
        condition: (steps) => {
          const confidences = steps.map((s) => s.confidence);
          const avgConfidence = confidences.reduce((a, b) => a + b, 0) / confidences.length;
          const variance = confidences.reduce((acc, c) => acc + Math.pow(c - avgConfidence, 2), 0) / confidences.length;

          return variance < 0.1; // Low variance in confidence levels
        },
        coherenceBoost: 0.1,
        description: 'Consistent confidence levels across steps',
      },
    ];
  }

  private initializeEleganceMetrics(): void {
    this.eleganceMetrics = [
      {
        id: 'simplicity',
        calculate: (step) => {
          const complexity = step.premises.length + step.evidence.length;
          return Math.max(0, 1 - complexity * 0.1);
        },
        weight: 0.3,
        description: 'Prefer simpler steps with fewer premises',
      },
      {
        id: 'confidence',
        calculate: (step) => step.confidence,
        weight: 0.4,
        description: 'Higher confidence is more elegant',
      },
      {
        id: 'evidence_quality',
        calculate: (step) => {
          if (step.evidence.length === 0) {
            return 0.1;
          }

          const avgReliability = step.evidence.reduce((sum, ev) => sum + ev.reliability, 0) / step.evidence.length;

          return avgReliability;
        },
        weight: 0.2,
        description: 'High-quality evidence is more elegant',
      },
      {
        id: 'clarity',
        calculate: (step) => {
          const statement = step.statement;
          const clarity = Math.min(1, 100 / statement.length);

          // Shorter statements are clearer
          return clarity;
        },
        weight: 0.1,
        description: 'Clear, concise statements are more elegant',
      },
    ];
  }

  // Helper methods

  private updateContextHistory(context: RelevanceRealizationContext): void {
    this.contextHistory.push(context);

    if (this.contextHistory.length > this.maxHistorySize) {
      this.contextHistory.shift();
    }
  }

  private extractTimeFromId(id: string): number {
    const matches = id.match(/_(\d+)$/);
    return matches ? parseInt(matches[1]) : 0;
  }

  /**
   * Get learning patterns from context history
   */
  getLearningPatterns(): {
    frequentGoals: string[];
    commonIngredients: string[];
    successfulPatterns: string[];
  } {
    const goalCounts = new Map<string, number>();
    const ingredientCounts = new Map<string, number>();

    for (const context of this.contextHistory) {
      // Count goal frequencies
      const currentCount = goalCounts.get(context.currentGoal) || 0;
      goalCounts.set(context.currentGoal, currentCount + 1);

      // Count ingredient frequencies
      for (const ingredient of context.activeIngredients) {
        const ingCount = ingredientCounts.get(ingredient) || 0;
        ingredientCounts.set(ingredient, ingCount + 1);
      }
    }

    const frequentGoals = Array.from(goalCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([goal]) => goal);

    const commonIngredients = Array.from(ingredientCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([ingredient]) => ingredient);

    return {
      frequentGoals,
      commonIngredients,
      successfulPatterns: [], // Could be enhanced with success tracking
    };
  }
}
