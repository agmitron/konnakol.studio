import { RouterProvider } from "react-router-dom";
import router from "./router";
import './init'
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

function App() {
  console.log('editor.konnakol.studio')

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
