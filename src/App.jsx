import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn";
import Info from "./pages/InFo";
import { Layout } from "./components/layout/Layout";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themeMuiStyle";
import { Main } from "./pages/Main";
import { Coffee } from "./pages/Coffee";
import InfoEdit from "./pages/InfoEdit";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Layout>
          <Routes>
            <Route exact path="/" element={<SignIn />} />
            <Route exact path="/info" element={<Info />} />
            <Route exact path="/main" element={<Main />} />
            <Route exact path="/coffee" element={<Coffee />} />
            <Route exact path="/info-edit" element={<InfoEdit />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
