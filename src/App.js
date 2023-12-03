import { createTheme } from "@mui/material";
import RouterDom from "././router/router";
import { ThemeProvider } from "@emotion/react";
function App() {
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
        <RouterDom />
    </ThemeProvider>
  );
}

export default App;
