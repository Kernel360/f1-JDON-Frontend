import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn";
import Info from "./pages/InFo";
import { Layout } from "./components/layout/Layout";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themeMuiStyle";
import { InFoJD } from "./components/info/InfoJD";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Layout>
          <Routes>
            <Route exact path="/" element={<SignIn />} />
            <Route exact path="/info" element={<Info />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
