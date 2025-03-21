export interface FeatureSettings {
  id: string;
  name: string;
  description: string;
  section: SettingSection;
  enabled: boolean;
  default: boolean;
  options?: FeatureOption[];
}

export enum SettingSection {
  General = "General",
  Transactions = "Transactions",
  Budget = "Budget",
  Assets = "Assets",
  Reports = "Reports",
}

export interface FeatureOption {
  id: string;
  name: string;
  description: string;
  default: any;
  value: any;
  type?: "select";
  options?: Array<{ value: string; label: string }>;
}
