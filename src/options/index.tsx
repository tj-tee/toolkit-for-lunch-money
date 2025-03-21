import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { allFeatures } from "../content/features/features";
import { FeatureSettings, SettingSection } from "../types";
import { getFeatures, saveFeatures } from "../utils/settings";
import { theme, commonStyles } from "../styles/theme";

const OptionsPage: React.FC = () => {
  const [features, setFeatures] = useState<Record<string, FeatureSettings>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      const storedFeatures = await getFeatures();
      setFeatures(storedFeatures);
      setLoading(false);
    };

    loadSettings();
  }, []);

  const handleToggleFeature = (featureId: string) => {
    setFeatures((prevFeatures) => {
      const updatedFeatures = {
        ...prevFeatures,
        [featureId]: {
          ...prevFeatures[featureId],
          enabled: !prevFeatures[featureId].enabled,
        },
      };

      saveFeatures(updatedFeatures);
      return updatedFeatures;
    });
  };

  const handleOptionChange = (
    featureId: string,
    optionId: string,
    value: any
  ) => {
    setFeatures((prevFeatures) => {
      const updatedOptions = prevFeatures[featureId].options?.map((option) =>
        option.id === optionId ? { ...option, value } : option
      );

      const updatedFeatures = {
        ...prevFeatures,
        [featureId]: {
          ...prevFeatures[featureId],
          options: updatedOptions,
        },
      };

      saveFeatures(updatedFeatures);
      return updatedFeatures;
    });
  };

  if (loading) {
    return (
      <div style={commonStyles.container} className="p-8">
        Loading settings...
      </div>
    );
  }

  // Group features by section
  const featuresBySection = allFeatures.reduce((acc, feature) => {
    const section = feature.section;
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(feature);
    return acc;
  }, {} as Record<SettingSection, FeatureSettings[]>);

  return (
    <div
      style={{
        ...commonStyles.container,
        maxWidth: "800px",
        margin: "0 auto",
        padding: theme.spacing.lg,
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: 700,
          marginBottom: theme.spacing.lg,
          color: theme.colors.text.primary,
        }}
      >
        Lunch Money Toolkit Settings
      </h1>

      {Object.entries(featuresBySection).map(([section, sectionFeatures]) => (
        <div key={section} style={{ marginBottom: theme.spacing.lg }}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 600,
              marginBottom: theme.spacing.sm,
              color: theme.colors.text.tertiary,
            }}
          >
            {section}
          </h2>
          {sectionFeatures.map((feature) => (
            <div
              key={feature.id}
              style={{
                ...commonStyles.card,
                marginBottom: theme.spacing.sm,
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  id={feature.id}
                  checked={features[feature.id]?.enabled ?? feature.default}
                  onChange={() => handleToggleFeature(feature.id)}
                  style={{
                    marginRight: "0.5rem",
                    width: "1rem",
                    height: "1rem",
                  }}
                />
                <label
                  htmlFor={feature.id}
                  style={{
                    fontWeight: 500,
                    fontSize: "16px",
                    color: theme.colors.text.primary,
                  }}
                >
                  {feature.name}
                </label>
              </div>
              <p
                style={{
                  marginTop: "0.5rem",
                  fontSize: "14px",
                  color: theme.colors.text.secondary,
                }}
              >
                {feature.description}
              </p>

              {/* Render feature options if they exist */}
              {features[feature.id]?.options?.map((option) => (
                <div
                  key={option.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "0.75rem",
                    marginLeft: "1.5rem",
                  }}
                >
                  {option.type === "select" ? (
                    <>
                      <label
                        htmlFor={`${feature.id}-${option.id}`}
                        style={{
                          fontSize: "14px",
                          color: theme.colors.text.tertiary,
                          marginRight: "0.5rem",
                        }}
                      >
                        {option.name}
                      </label>
                      <select
                        id={`${feature.id}-${option.id}`}
                        value={option.value ?? option.default}
                        onChange={(e) =>
                          handleOptionChange(
                            feature.id,
                            option.id,
                            e.target.value
                          )
                        }
                        style={{
                          padding: "0.25rem",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                        }}
                      >
                        {option.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        id={`${feature.id}-${option.id}`}
                        checked={option.value ?? option.default}
                        onChange={(e) =>
                          handleOptionChange(
                            feature.id,
                            option.id,
                            e.target.checked
                          )
                        }
                        style={{
                          marginRight: "0.5rem",
                          width: "0.875rem",
                          height: "0.875rem",
                        }}
                      />
                      <label
                        htmlFor={`${feature.id}-${option.id}`}
                        style={{
                          fontSize: "14px",
                          color: theme.colors.text.tertiary,
                        }}
                      >
                        {option.name}
                      </label>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<OptionsPage />);
