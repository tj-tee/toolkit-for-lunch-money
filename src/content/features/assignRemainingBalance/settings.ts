import { FeatureSettings, SettingSection } from "../../../types";

export const assignRemainingBalanceSettings: FeatureSettings = {
  id: "assignRemainingBalance",
  name: "Assign Remaining Balance To Split",
  description:
    "Adds a button to each transaction split to assign the remaining balance to the split amount. Also, auto populates the split amount when there is only one empty split amount.",
  section: SettingSection.Transactions,
  enabled: true,
  default: true,
  options: [
    {
      id: "currency",
      name: "Default Currency",
      description: "Select the currency format to use",
      type: "select",
      default: "USD",
      value: "USD",
      options: [
        { value: "USD", label: "US Dollar ($)" },
        { value: "CAD", label: "Canadian Dollar (CAD)" },
        { value: "EUR", label: "Euro (€)" },
        { value: "GBP", label: "British Pound (£)" },
        // Add more currencies as needed
      ],
    },
  ],
};
