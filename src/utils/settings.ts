import { allFeatures, featureSettingsMap } from "../content/features/features";
import { FeatureSettings, FeatureOption } from "../types";

export async function getFeatures(): Promise<Record<string, FeatureSettings>> {
  return new Promise((resolve) => {
    chrome.storage.sync.get("featureSettings", (result) => {
      let settings = result.featureSettings || {};

      // Initialize with defaults for any new features
      let updated = false;
      allFeatures.forEach((feature) => {
        if (!settings[feature.id]) {
          settings[feature.id] = { ...feature };
          updated = true;
        } else {
          // Ensure options are properly initialized
          if (feature.options) {
            settings[feature.id].options = feature.options.map((defaultOpt) => {
              const existingOpt = settings[feature.id].options?.find(
                (opt: FeatureOption) => opt.id === defaultOpt.id
              );
              return {
                ...defaultOpt,
                value: existingOpt?.value ?? defaultOpt.default,
              };
            });
            updated = true;
          }
        }
      });

      if (updated) {
        saveFeatures(settings);
      }

      resolve(settings);
    });
  });
}

export async function saveFeatures(
  settings: Record<string, FeatureSettings>
): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ featureSettings: settings }, () => {
      resolve();
    });
  });
}

export async function isFeatureEnabled(featureId: string): Promise<boolean> {
  const features = await getFeatures();
  return (
    features[featureId]?.enabled ??
    featureSettingsMap[featureId]?.default ??
    false
  );
}
