import { RecoilRoot } from "recoil";

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
import KakaoRedirectPage from "./pages/sign-in/KakaoRedirectPage";
import MyCoffeeChat from "./pages/MyCoffeeChat";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Layout>
            <Routes>
              <Route exact path="/" element={<Main />} />
              <Route exact path="/signin" element={<SignIn />} />
              <Route exact path="/info" element={<Info />} />
              <Route exact path="/coffee" element={<Coffee />} />
              <Route exact path="/coffee/:id" element={<CoffeeDetail />} />
              <Route exact path="/mypage" element={<MyPage />} />
              <Route exact path="/mypage/infoedit" element={<InfoEdit />} />
              <Route exact path="/mypage/video" element={<FavoritesVideo />} />
              <Route exact path="/mypage/withdrawal" element={<Withdrawal />} />
              <Route exact path="/mypage/coffee" element={<MyCoffeeChat />} />
              //손보기
              <Route
                exact
                path="/mypage/coffee/:id"
                element={<CoffeeDetail />}
              />
              <Route path="/oauth/info" element={<KakaoRedirectPage />} />
              <Route
                path="/oauth/login/success"
                element={<KakaoRedirectPage />}
              />
              <Route exact path="/coffeechat-open" element={<Coffeeopen />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
