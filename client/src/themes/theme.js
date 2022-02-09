import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    normal: "normal",
    body1: {
      fontStyle: "normal",
      lineHeight: "normal"
    },
    body2: {
      fontSize: `${(12/14)}rem`,
      fontWeight: "600",
      fontStyle: "normal",
      lineHeight: `${(16/14)}rem`,
    },
    h2: {
      fontSize: `${(26/14)}rem`,
      lineHeight: `${(40/14)}rem`,
      fontStyle: "normal",
    },
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontStyle: "normal",
      lineHeight: "normal",
      fontSize: "1rem",
      fontWeight: "bold"
    },
    fontSize: 14
  },
  spacing: (factor) => `${factor}rem`,
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@media (min-width: 0px)": {
          html: {
            fontSize: 8
          }
        },
        "@media (min-width: 370px)": {
          html: {
            fontSize: 10
          }
        },
        "@media (min-width: 600px)": {
          html: {
            fontSize: 12
          }
        },
        "@media (min-width: 960px)": {
          html: {
            fontSize: 14
          }
        },
        "@media (min-width: 1280px)": {
          html: {
            fontSize: 18
          }
        },
      }
    },
    MuiInput: {
      input: {
        fontWeight: "bold"
      }
    }
  },
  palette: {
    primary: { main: "#3A8DFF", dark: "#86B9FF", white: "#FFFFFF", grey: "#B0B0B0"},
    secondary: { main: "#B0B0B0" }
  }
});
