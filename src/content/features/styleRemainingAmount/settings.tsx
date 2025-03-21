import { FeatureSettings, SettingSection } from "../../../types";

export const styleRemainingAmountSettings: FeatureSettings = {
  id: "styleRemainingAmount",
  name: "Style Remaining Amount",
  description:
    "Improves the legibility of the remaining amount display in split views",
  default: true,
  section: SettingSection.Transactions,
  enabled: true,
  options: [],
};
