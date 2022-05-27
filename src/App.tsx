import React from "react";
import "./App.css";
import Home from "./views/Home";
import { colors } from "shared/colors";
import { createTheme, ThemeProvider } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.brandRed,
    },
    secondary: {
      main: colors.brandBlue,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
