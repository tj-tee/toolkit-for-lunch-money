export const theme = {
  colors: {
    background: "#ffffff",
    card: "#f7fafc",
    border: "#e2e8f0",
    text: {
      primary: "#1a202c",
      secondary: "#718096",
      tertiary: "#4a5568",
    },
    accent: "#00a3bf",
    button: {
      background: "#00a3bf",
      hover: "#008ca3",
      text: "#ffffff",
    },
  },
  fonts: {
    primary: "Avenir, sans-serif",
  },
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
  },
  borderRadius: "0.375rem",
};

export const commonStyles = {
  container: {
    fontFamily: theme.fonts.primary,
    backgroundColor: theme.colors.background,
    color: theme.colors.text.primary,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius,
    border: `1px solid ${theme.colors.border}`,
    padding: theme.spacing.sm,
  },
  button: {
    backgroundColor: theme.colors.button.background,
    color: theme.colors.button.text,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.borderRadius,
    border: "none",
    cursor: "pointer",
    fontFamily: theme.fonts.primary,
    fontSize: "14px",
    fontWeight: 500,
    width: "100%",
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: theme.colors.button.hover,
    },
  },
};
