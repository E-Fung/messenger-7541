import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    h2: {
      fontSize: "1.86rem",
      lineHeight: "2.86rem",
      fontStyle: "normal",
    },
    body1: {
      fontStyle: "normal",
      lineHeight: "normal"
    },
    body2: {
      fontSize: "0.86rem",
      fontWeight: "600",
      fontStyle: "normal",
      lineHeight: "1.14rem"
    },
    fontSize: 14,
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold",
      fontStyle: "normal",
      lineHeight: "normal",
      fontSize: "1rem",
    }
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "bold"
      }
    }
  },
  palette: {
    primary: { main: "#3A8DFF", dark: "#86B9FF" },
    secondary: { main: "#B0B0B0" }
  }
});
