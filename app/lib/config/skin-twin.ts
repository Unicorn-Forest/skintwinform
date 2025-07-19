/*
 * SKIN-TWIN Integration Utility
 * This file provides utilities for integrating SKIN-TWIN functionality into the skin.twin app
 */

import { singleUserConfig } from './single-user';

// SKIN-TWIN specific capabilities and features
export const skinTwinCapabilities = {
  formulationDesign: true,
  ingredientAnalysis: true,
  chemicalReactionSimulation: true,
  safetyAssessment: true,
  productDevelopment: true,
};

// SKIN-TWIN UI customization
export const skinTwinUICustomization = {
  primaryColor: '#2563eb', // Blue for skincare/medical feel
  secondaryColor: '#06b6d4', // Cyan accent for freshness
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  logoText: 'SKIN-TWIN',
  subtitleText: 'Virtual Turbo Reactor Formulation Vessel',
};

// Helper function to check if SKIN-TWIN mode is enabled
export const isSkinTwinMode = () => true; // Always enabled in this simplified version

// Helper function to get SKIN-TWIN configuration
export const getSkinTwinConfig = () => {
  return {
    ...singleUserConfig,
    assistantName: 'SKIN-TWIN',
    assistantDescription: 'Virtual Turbo Reactor Formulation Vessel',
    capabilities: skinTwinCapabilities,
    ui: skinTwinUICustomization,
  };
};

export default getSkinTwinConfig;
