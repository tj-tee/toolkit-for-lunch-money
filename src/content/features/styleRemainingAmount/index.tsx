import React, { useEffect } from "react";
import { isFeatureEnabled } from "../../../utils/settings";
import { styleRemainingAmountSettings } from "./settings";

const StyleRemainingAmount: React.FC = () => {
  useEffect(() => {
    const styleRemainingAmount = async () => {
      // Early returns for feature checks
      const enabled = await isFeatureEnabled(styleRemainingAmountSettings.id);
      if (!enabled || !window.location.href.includes("/transactions")) return;

      const modalContainer = document.querySelector(
        ".g-modal-container.visible"
      );
      if (!modalContainer) return;

      // Style the remaining amount display
      const remainingAmountElement = modalContainer.querySelector(
        ".split-amount-left"
      ) as HTMLElement;
      if (remainingAmountElement) {
        remainingAmountElement.style.cssText = ` 
          line-height: 1.6em;
          font-size: 1.3em;
          font-family: 'Inconsolata'
        `;

        // Style the span containing the amount
        const amountSpan = remainingAmountElement.querySelector(
          "span"
        ) as HTMLElement;
        if (amountSpan) {
          amountSpan.style.cssText = `
            font-weight: 600;
            color: #ffffff;
          `;
          amountSpan.className = "";
        }
      }
    };

    // Initial setup and watch for DOM changes
    styleRemainingAmount();
    const observer = new MutationObserver(styleRemainingAmount);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default StyleRemainingAmount;
