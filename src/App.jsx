import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/sign-in/SignIn";
import Info from "./pages/info/InFo";
import { Layout } from "./components/layout/Layout";
import { ThemeProvider } from "@mui/material/styles";
import { Coffee } from "./pages/coffeechat/Coffee";
import { theme } from "./styles/themeMuiStyle";
import MyPage from "./pages/MyPage";
import InfoEdit from "./pages/InfoEdit";
import CoffeeDetail from "./pages/coffee-detail/CoffeeDetail";
import { Main } from "./pages/mainpage/Main";
import Coffeeopen from "./pages/coffeechat/CoffeeOpen";
import Withdrawal from "./pages/Withdrawal";
import FavoritesVideo from "./pages/FavoritesVideo";

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
            <Route exact path="/mypage/infoedit" element={<InfoEdit />} />
            <Route exact path="/mypage/video" element={<FavoritesVideo />} />
            <Route exact path="/mypage/withdrawal" element={<Withdrawal />} />
            {/* </Route> */}
            <Route exact path="/coffeechat-open" element={<Coffeeopen />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
