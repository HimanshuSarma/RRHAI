import { createTheme } from "@mui/material/styles";

// Define your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff", // Change this to your primary color
    },
    secondary: {
      main: "#D175B6", // Change this to your secondary color
    }
  },
  typography: {
    fontFamily: "Kanit, sans-serif",
    fontSize: 16, // Change the default font size if needed
    button: {
      fontWeight: 400,
    },
    allVariants: {
      fontSize: "16px",
      color: "#ffffff",
      fontWeight: "400",
    },
    h1: {
      fontWeight: 400,
      fontSize: "40px",
      // color: '#1e2538',
    },
    h2: {
      fontWeight: 400,
      fontSize: "2.5rem",
    },
    h3: {
      fontWeight: 400,
      fontSize: "2rem",
    },
    h4: {
      fontWeight: 400,
      fontSize: "1.7rem",
    },
    h5: {
      fontWeight: 400,
      // fontWeight: '16px',
      fontSize: "1.1rem",
    },
    h6: {
      fontWeight: 400,
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: "secondary",
        variant: "contained",
      },
      styleOverrides: {
        containedSecondary: {
          fontWeight: 400,
          fontSize: "15px",
          borderRadius: "5px",
          textTransform: "capitalize",
          padding: "10px 20px",
          minWidth: "100px",
          border: "1px solid #0b0087",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontWeight: "400",
          "&.Mui-error": {
            fontSize: "12px",
            marginLeft: 0,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#000",
          borderRadius: "8px",
          color: "#fff",
          fontSize: "14px",
          border: "2px solid #D175B6",
          display: "inline-flex",
        },
        arrow: {
          color: "#D175B6",
        },
      },
    },
  },
});

export default theme;
