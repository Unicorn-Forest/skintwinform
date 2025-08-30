/**
 * SKIN-TWIN Formulation Proof Assistant UI Component
 *
 * Main interface for the cognitive proof assistant that provides
 * formal verification of skincare formulation hypotheses.
 */

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BeakerIcon, CheckCircleIcon, ExclamationTriangleIcon, LightBulbIcon } from '@heroicons/react/24/outline';

import type {
  VerificationRequest,
  VerificationResult,
  ProofStep,
  IngredientEffect,
  FormulationConstraint,
} from '~/lib/proof-assistant/types';

import { FormulationVerificationEngine } from '~/lib/proof-assistant/verification-engine';

interface ProofAssistantProps {
  onVerificationComplete?: (result: VerificationResult) => void;
  initialHypothesis?: string;
  availableIngredients?: Array<{
    id: string;
    label: string;
    inci_name: string;
    category: string;
    molecular_weight: number;
    safety_rating: string;
  }>;
}

export function ProofAssistant({
  onVerificationComplete,
  initialHypothesis = '',
  availableIngredients = [],
}: ProofAssistantProps) {
  const [hypothesis, setHypothesis] = useState(initialHypothesis);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [targetEffects, setTargetEffects] = useState<IngredientEffect[]>([]);
  const [constraints, setConstraints] = useState<FormulationConstraint[]>([]);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationEngine] = useState(() => new FormulationVerificationEngine());

  const handleVerification = useCallback(async () => {
    if (!hypothesis.trim()) {
      alert('Please enter a hypothesis to verify');
      return;
    }

    if (selectedIngredients.length === 0) {
      alert('Please select at least one ingredient');
      return;
    }

    setIsVerifying(true);

    try {
      const ingredients = availableIngredients.filter((ing) => selectedIngredients.includes(ing.id));

      const request: VerificationRequest = {
        hypothesis,
        ingredients,
        targetEffects,
        constraints,
        skinModel: {
          layers: [
            {
              id: 'stratum_corneum',
              name: 'Stratum Corneum',
              depth: 15,
              cellTypes: ['corneocytes'],
              permeability: 0.1,
              ph: 5.5,
              functions: ['barrier', 'protection'],
            },
            {
              id: 'epidermis',
              name: 'Epidermis',
              depth: 100,
              cellTypes: ['keratinocytes'],
              permeability: 0.3,
              ph: 6.5,
              functions: ['renewal'],
            },
          ],
          barriers: [],
          transport: [],
        },
      };

      const result = await verificationEngine.verifyFormulationHypothesis(request);
      setVerificationResult(result);
      onVerificationComplete?.(result);
    } catch (error) {
      console.error('Verification failed:', error);
      alert('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  }, [
    hypothesis,
    selectedIngredients,
    targetEffects,
    constraints,
    availableIngredients,
    verificationEngine,
    onVerificationComplete,
  ]);

  const addTargetEffect = useCallback(() => {
    setTargetEffects((prev) => [
      ...prev,
      {
        ingredientId: selectedIngredients[0] || '',
        targetLayer: 'epidermis',
        effectType: 'hydration',
        magnitude: 1.0,
        timeframe: 60,
        confidence: 0.8,
        mechanismOfAction: 'barrier_enhancement',
      },
    ]);
  }, [selectedIngredients]);

  const addConstraint = useCallback(() => {
    setConstraints((prev) => [
      ...prev,
      {
        type: 'ph',
        parameter: 'ph_range',
        value: 6.5,
        operator: 'eq',
        required: true,
      },
    ]);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BeakerIcon className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">SKIN-TWIN Formulation Proof Assistant</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Cognitive proof assistant for formal verification of multi-scale skin model interactions and hypothetical
          ingredient effects using advanced reasoning algorithms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <LightBulbIcon className="w-5 h-5 text-yellow-600" />
              Formulation Hypothesis
            </h2>

            <textarea
              value={hypothesis}
              onChange={(e) => setHypothesis(e.target.value)}
              placeholder="Enter your formulation hypothesis (e.g., 'Combining hyaluronic acid with niacinamide will enhance skin hydration and reduce inflammation')"
              className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Select Ingredients</h2>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableIngredients.map((ingredient) => (
                <label
                  key={ingredient.id}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedIngredients.includes(ingredient.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIngredients((prev) => [...prev, ingredient.id]);
                      } else {
                        setSelectedIngredients((prev) => prev.filter((id) => id !== ingredient.id));
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{ingredient.label}</div>
                    <div className="text-sm text-gray-500">
                      {ingredient.inci_name} • {ingredient.category}
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      ingredient.safety_rating === 'high'
                        ? 'bg-green-100 text-green-800'
                        : ingredient.safety_rating === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {ingredient.safety_rating}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Target Effects</h2>
              <button
                onClick={addTargetEffect}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                disabled={selectedIngredients.length === 0}
              >
                Add Effect
              </button>
            </div>

            {targetEffects.length === 0 ? (
              <p className="text-gray-500 text-sm">No target effects defined</p>
            ) : (
              <div className="space-y-2">
                {targetEffects.map((effect, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded border flex items-center justify-between">
                    <div className="text-sm">
                      <div className="font-medium">{effect.effectType}</div>
                      <div className="text-gray-500">Target: {effect.targetLayer}</div>
                    </div>
                    <button
                      onClick={() => setTargetEffects((prev) => prev.filter((_, i) => i !== index))}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Constraints</h2>
              <button
                onClick={addConstraint}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                Add Constraint
              </button>
            </div>

            {constraints.length === 0 ? (
              <p className="text-gray-500 text-sm">No constraints defined</p>
            ) : (
              <div className="space-y-2">
                {constraints.map((constraint, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded border flex items-center justify-between">
                    <div className="text-sm">
                      <div className="font-medium">
                        {constraint.type}: {constraint.parameter}
                      </div>
                      <div className="text-gray-500">
                        {constraint.operator} {constraint.value}
                      </div>
                    </div>
                    <button
                      onClick={() => setConstraints((prev) => prev.filter((_, i) => i !== index))}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <button
              onClick={handleVerification}
              disabled={isVerifying || !hypothesis.trim() || selectedIngredients.length === 0}
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isVerifying ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Verifying Hypothesis...
                </div>
              ) : (
                'Verify Formulation Hypothesis'
              )}
            </button>
          </motion.div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <AnimatePresence>
            {verificationResult && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Verification Status */}
                <div
                  className={`rounded-lg p-6 ${
                    verificationResult.isValid
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {verificationResult.isValid ? (
                      <CheckCircleIcon className="w-6 h-6 text-green-600" />
                    ) : (
                      <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                    )}
                    <h3 className="text-lg font-semibold">
                      Verification {verificationResult.isValid ? 'Successful' : 'Failed'}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Confidence: </span>
                      <span
                        className={`${
                          verificationResult.confidence > 0.7
                            ? 'text-green-600'
                            : verificationResult.confidence > 0.4
                              ? 'text-yellow-600'
                              : 'text-red-600'
                        }`}
                      >
                        {(verificationResult.confidence * 100).toFixed(1)}%
                      </span>
                    </div>

                    <div>
                      <span className="font-medium">Proof Validity: </span>
                      <span>{(verificationResult.proof.validity * 100).toFixed(1)}%</span>
                    </div>

                    <div>
                      <span className="font-medium">Proof Completeness: </span>
                      <span>{(verificationResult.proof.completeness * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                {/* Proof Steps */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Proof Steps</h3>

                  <div className="space-y-3">
                    {verificationResult.proof.steps.map((step, index) => (
                      <ProofStepComponent key={step.id} step={step} index={index + 1} />
                    ))}
                  </div>
                </div>

                {/* Warnings */}
                {verificationResult.warnings.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-yellow-800">Warnings</h3>
                    <ul className="space-y-2">
                      {verificationResult.warnings.map((warning, index) => (
                        <li key={index} className="text-yellow-700 text-sm flex items-start gap-2">
                          <ExclamationTriangleIcon className="w-4 h-4 mt-0.5 text-yellow-600" />
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                {verificationResult.recommendations.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-blue-800">Recommendations</h3>
                    <ul className="space-y-2">
                      {verificationResult.recommendations.map((rec, index) => (
                        <li key={index} className="text-blue-700 text-sm flex items-start gap-2">
                          <LightBulbIcon className="w-4 h-4 mt-0.5 text-blue-600" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Sub-component for rendering individual proof steps
function ProofStepComponent({ step, index }: { step: ProofStep; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'assumption':
        return '📋';
      case 'verification':
        return '🔍';
      case 'deduction':
        return '🧮';
      case 'conclusion':
        return '✅';
      default:
        return '📝';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 0.8) {
      return 'text-green-600';
    }

    if (confidence > 0.6) {
      return 'text-yellow-600';
    }

    return 'text-red-600';
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center gap-3">
          <span className="text-lg">{getStepIcon(step.type)}</span>
          <div>
            <div className="font-medium">
              Step {index}: {step.type.charAt(0).toUpperCase() + step.type.slice(1)}
            </div>
            <div className="text-sm text-gray-600 truncate max-w-md">{step.statement}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${getConfidenceColor(step.confidence)}`}>
            {(step.confidence * 100).toFixed(0)}%
          </span>
          <span className="text-gray-400">{isExpanded ? '▼' : '▶'}</span>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-100"
          >
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium">Statement: </span>
                <span>{step.statement}</span>
              </div>

              {step.premises.length > 0 && (
                <div>
                  <span className="font-medium">Premises: </span>
                  <span className="text-gray-600">{step.premises.join(', ')}</span>
                </div>
              )}

              <div>
                <span className="font-medium">Rule: </span>
                <span className="text-gray-600">{step.rule}</span>
              </div>

              {step.evidence.length > 0 && (
                <div>
                  <span className="font-medium">Evidence: </span>
                  <div className="mt-1 space-y-1">
                    {step.evidence.map((evidence, idx) => (
                      <div key={idx} className="text-xs bg-gray-50 p-2 rounded">
                        <div>
                          <strong>Type:</strong> {evidence.type}
                        </div>
                        <div>
                          <strong>Source:</strong> {evidence.source}
                        </div>
                        <div>
                          <strong>Reliability:</strong> {(evidence.reliability * 100).toFixed(0)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
