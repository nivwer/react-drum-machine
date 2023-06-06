import DrumMachine from "./components/DrumMachine";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <DrumMachine />
      </ThemeProvider>
      ;
    </>
  );
}

export default App;
