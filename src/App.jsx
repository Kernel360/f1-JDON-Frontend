import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn";
import Info from "./pages/info/InFo";
import { Layout } from "./components/layout/Layout";
import { ThemeProvider } from "@mui/material/styles";
import { Main } from "./pages/Main";
import { Coffee } from "./pages/Coffee";
import { theme } from "./styles/themeMuiStyle";
import MyPage from "./pages/MyPage";
import CoffeeDetail from "./pages/coffee-detail/CoffeeDetail";

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
            <Route exact path="/coffee/:id" element={<CoffeeDetail />} />
            <Route exact path="/mypage" element={<MyPage />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
