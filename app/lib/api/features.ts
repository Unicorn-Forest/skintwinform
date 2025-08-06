export interface Feature {
  id: string;
  name: string;
  description: string;
  viewed: boolean;
  releaseDate: string;
}

const FEATURE_FLAGS_URL = '/feature-flags.json';
const VIEWED_FEATURES_KEY = 'bolt_viewed_features';

export const getViewedFeatureIds = (): string[] => {
  try {
    const stored = localStorage.getItem(VIEWED_FEATURES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const setViewedFeatureIds = (featureIds: string[]): void => {
  try {
    localStorage.setItem(VIEWED_FEATURES_KEY, JSON.stringify(featureIds));
  } catch (error) {
    console.error('Failed to persist viewed features:', error);
  }
};

interface FeatureData {
  id: string;
  name: string;
  description: string;
  releaseDate: string;
}

export const getFeatureFlags = async (): Promise<Feature[]> => {
  const response = await fetch(FEATURE_FLAGS_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch feature flags');
  }

  const features: FeatureData[] = await response.json();
  const viewed = new Set(getViewedFeatureIds());

  return features.map((feature) => ({
    ...feature,
    viewed: viewed.has(feature.id),
  }));
};

export const markFeatureViewed = async (featureId: string): Promise<void> => {
  const viewed = new Set(getViewedFeatureIds());

  if (!viewed.has(featureId)) {
    viewed.add(featureId);
    setViewedFeatureIds([...viewed]);
  }
};
