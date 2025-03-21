import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { FeatureSettings } from "../types";
import { getFeatures } from "../utils/settings";

// Import all feature components
import AssignRemainingBalance from "./features/assignRemainingBalance";
import StyleRemainingAmount from "./features/styleRemainingAmount";

const App: React.FC = () => {
  const [enabledFeatures, setEnabledFeatures] = useState<
    Record<string, FeatureSettings>
  >({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadFeatures = async () => {
      const features = await getFeatures();
      setEnabledFeatures(features);
      setLoaded(true);
    };

    loadFeatures();
  }, []);

  if (!loaded) return null;

  return (
    <>
      {/* Only render features that are enabled */}

      {enabledFeatures["assignRemainingBalance"]?.enabled && (
        <AssignRemainingBalance />
      )}
      {enabledFeatures["styleRemainingAmount"]?.enabled && (
        <StyleRemainingAmount />
      )}
    </>
  );
};

// Create a container for our React app
const container = document.createElement("div");
container.id = "toolkit-for-lunchmoney-container";
document.body.appendChild(container);

// Render our React app
const root = createRoot(container);
root.render(<App />);
