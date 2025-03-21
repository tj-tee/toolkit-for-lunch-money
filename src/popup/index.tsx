import React from "react";
import { createRoot } from "react-dom/client";
import { theme, commonStyles } from "../styles/theme";

const Popup: React.FC = () => {
  const openOptions = () => {
    chrome.runtime.sendMessage({ type: "OPEN_OPTIONS" });
  };

  return (
    <div
      style={{
        ...commonStyles.container,
        width: "256px",
        padding: theme.spacing.sm,
      }}
    >
      <h1
        style={{
          fontSize: "20px",
          fontWeight: 700,
          marginBottom: theme.spacing.sm,
          color: theme.colors.text.primary,
        }}
      >
        Lunch Money Toolkit
      </h1>

      <p
        style={{
          marginBottom: theme.spacing.sm,
          color: theme.colors.text.secondary,
          fontSize: "14px",
        }}
      >
        Tweak your Lunch Money experience!
      </p>

      <button
        onClick={openOptions}
        style={{
          ...commonStyles.button,
          marginBottom: theme.spacing.sm,
        }}
      >
        Settings
      </button>

      <div
        style={{
          marginTop: theme.spacing.sm,
          fontSize: "12px",
          color: theme.colors.text.secondary,
        }}
      >
        <p>
          This extension is not officially affiliated with Lunch Money or
          Lunchbag Labs, Inc.
        </p>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<Popup />);
