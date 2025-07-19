/**
 * Single-user configuration for SKIN-TWIN mode
 * This file contains settings and utilities for running skin.twin in single-user mode
 */

// Environment variables for single-user mode
export const SINGLE_USER_MODE = import.meta.env.VITE_SINGLE_USER_MODE === 'true';
export const DISABLE_CLOUDFLARE = import.meta.env.VITE_DISABLE_CLOUDFLARE === 'true';
export const USE_LOCAL_PREVIEW = import.meta.env.VITE_USE_LOCAL_PREVIEW === 'true';

// Helper functions for single-user mode
export const isSingleUserMode = () => SINGLE_USER_MODE;
export const isCloudflareDisabled = () => DISABLE_CLOUDFLARE;
export const useLocalPreviewAsProduction = () => USE_LOCAL_PREVIEW;

// Default configuration for single-user mode
export const singleUserConfig = {
  // Disable multi-user features
  enableAuthentication: false,
  enableUserManagement: false,
  enableCloudSync: false,

  // Local environment settings
  defaultLocalPort: 3000,

  // UI customization for single-user mode
  hideMultiUserUI: true,
  hideCloudDeploymentOptions: true,

  // SKIN-TWIN specific settings
  assistantName: 'SKIN-TWIN',
  assistantDescription: 'Virtual Turbo Reactor Formulation Vessel',
};

export default singleUserConfig;
