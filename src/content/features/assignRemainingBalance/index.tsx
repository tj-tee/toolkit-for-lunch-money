import React, { useEffect } from "react";
import { isFeatureEnabled, getFeatures } from "../../../utils/settings";
import { assignRemainingBalanceSettings } from "./settings";
import { FeatureOption } from "../../../types";

const AssignRemainingBalance: React.FC = () => {
  useEffect(() => {
    const modifySplitViews = async () => {
      const enabled = await isFeatureEnabled(assignRemainingBalanceSettings.id);
      if (!enabled || !window.location.href.includes("/transactions")) return;

      const settings = await getFeatures();
      const feature = settings[assignRemainingBalanceSettings.id];
      const currencyOption = feature.options?.find(
        (opt: FeatureOption) => opt.id === "currency"
      );
      const selectedCurrency = currencyOption?.value || "USD";

      const modalContainer = document.querySelector(
        ".g-modal-container.visible"
      );
      if (!modalContainer) return;

      const formatter = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: selectedCurrency,
      });

      // Update the existing functions to use the formatter
      const getRemainingAmount = () => {
        const element = modalContainer.querySelector(".split-amount-left span");
        return parseFloat(element?.textContent?.replace(/[^\d.-]/g, "") || "0");
      };

      const formatAmount = (amount: number) => {
        return formatter.format(amount).replace(/[^\d.-]/g, "");
      };

      // Helper functions
      const autoPopulateRemainingAmount = () => {
        const splitViews = modalContainer.querySelectorAll(
          "#split-view.detail-buttons > div.transaction-details"
        );
        const remainingAmount = getRemainingAmount();

        if (remainingAmount === 0) return;

        let emptyInputs: HTMLInputElement[] = [];
        splitViews.forEach((splitView) => {
          const amountInput = splitView.querySelector(
            'input[id^="split-amount-"]'
          ) as HTMLInputElement;
          if (
            amountInput &&
            (!amountInput.value || amountInput.value === "0")
          ) {
            emptyInputs.push(amountInput);
          }
        });

        if (emptyInputs.length === 1) {
          const input = emptyInputs[0];
          input.value = formatAmount(remainingAmount);
          input.dispatchEvent(new Event("change", { bubbles: true }));
        }
      };

      const createCalculatorButton = () => {
        const button = document.createElement("button");
        button.className =
          "toolkit-quick-assign-btn ui orange icon basic button";
        button.style.cssText =
          "height: 36px; width: 36px; margin-bottom:0; position: static;";
        button.type = "button";

        const icon = document.createElement("i");
        icon.className = "balance scale icon";
        icon.style.cssText = "margin:0";
        icon.setAttribute("aria-hidden", "true");
        button.appendChild(icon);

        return button;
      };

      const updateButtonState = (button: HTMLButtonElement) => {
        const remainingAmount = getRemainingAmount();
        const isDisabled = remainingAmount === 0;

        button.disabled = isDisabled;
        button.classList.toggle("disabled", isDisabled);
        if (isDisabled) button.classList.add("basic");
      };

      const handleQuickAssign = (
        button: HTMLButtonElement,
        amountInput: HTMLInputElement
      ) => {
        const remainingAmount = getRemainingAmount();
        const existingValue = parseFloat(amountInput.value || "0");
        const newValue =
          existingValue > 0 ? remainingAmount + existingValue : remainingAmount;

        amountInput.value = formatAmount(newValue);
        amountInput.dispatchEvent(new Event("change", { bubbles: true }));

        setTimeout(() => updateButtonState(button), 0);
      };

      // Process each split view
      modalContainer
        .querySelectorAll(
          "#split-view.detail-buttons > div.transaction-details"
        )
        .forEach((splitView) => {
          const formFields = splitView.querySelector(".equal.width.fields");
          if (
            !formFields ||
            formFields.querySelector(".toolkit-quick-assign-btn")
          )
            return;

          const button = createCalculatorButton();
          const amountInput = formFields.querySelector(
            'input[id^="split-amount-"]'
          ) as HTMLInputElement;

          // Add event listeners
          button.addEventListener("mouseenter", () => {
            if (!button.disabled) button.classList.remove("basic");
          });

          button.addEventListener("mouseleave", () => {
            if (!button.disabled) button.classList.add("basic");
          });

          button.addEventListener("click", () => {
            if (amountInput) handleQuickAssign(button, amountInput);
          });

          // Add blur event listener for auto-population
          amountInput.addEventListener("blur", autoPopulateRemainingAmount);

          // Initial setup
          formFields.prepend(button);
          updateButtonState(button);

          // Watch for remaining amount changes
          const observer = new MutationObserver(() =>
            updateButtonState(button)
          );
          const remainingAmountElement =
            modalContainer.querySelector(".split-amount-left");
          if (remainingAmountElement) {
            observer.observe(remainingAmountElement, {
              subtree: true,
              characterData: true,
              childList: true,
            });
          }
        });
    };

    // Initial setup and watch for DOM changes
    modifySplitViews();
    const observer = new MutationObserver(modifySplitViews);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default AssignRemainingBalance;
