import { FeatureSettings } from "../../types";

import { assignRemainingBalanceSettings } from "./assignRemainingBalance/settings";
import { styleRemainingAmountSettings } from "./styleRemainingAmount/settings";

// Collect all features
export const allFeatures: FeatureSettings[] = [
  assignRemainingBalanceSettings,
  styleRemainingAmountSettings,
];

// Create a map for quick lookup
export const featureSettingsMap = allFeatures.reduce((map, feature) => {
  map[feature.id] = feature;
  return map;
}, {} as Record<string, FeatureSettings>);
