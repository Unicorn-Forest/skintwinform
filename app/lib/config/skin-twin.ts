/**
 * Skin Twin Integration Utility
 * This file provides utilities for integrating Skin Twin functionality into the bolt.diy app
 */

import { singleUserConfig } from './single-user';

// Skin Twin specific capabilities and features
export const skinTwinCapabilities = {
  skincareAnalysis: true,
  routinePersonalization: true,
  progressTracking: true,
};

// Skin Twin UI customization
export const skinTwinUICustomization = {
  primaryColor: '#fbbf24', // Warm amber tone
  secondaryColor: '#fde68a', // Light accent
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  logoText: 'Skin Twin',
  subtitleText: 'Personal AI Skincare Assistant',
};

// Helper function to check if Skin Twin mode is enabled
export const isSkinTwinMode = () => true; // Always enabled in this simplified version

// Helper function to get Skin Twin configuration
export const getSkinTwinConfig = () => {
  return {
    ...singleUserConfig,
    assistantName: 'Skin Twin',
    assistantDescription: 'Personal AI Skincare Assistant',
    capabilities: skinTwinCapabilities,
    ui: skinTwinUICustomization,
  };
};

export default getSkinTwinConfig;
