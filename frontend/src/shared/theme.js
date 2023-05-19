import { createTheme, responsiveFontSizes } from "@mui/material"
import { grey } from "@mui/material/colors"

export let theme = createTheme({
  typography: {
    fontFamily: "Caladea, serif",
    button: {
      fontWeight: "bold",
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          ":hover": {
            backgroundColor: grey[900],
          },
          backgroundColor: grey[900],
          color: "white",
          fontWeight: "bold",
        },
      },
    },
  },
})

theme = responsiveFontSizes(theme)
