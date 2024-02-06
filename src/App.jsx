import React from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import SignupFail from "./pages/info/SignupFail";
// import { isLoggedInState } from "./recoil/atoms";

// const isJSessionID = () => {
//   return document.cookie.includes("JSESSIONID");
// };
const access = JSON.parse(localStorage.getItem("isLoggedInState"));

console.log("!!로긴 유무", access);

function PrivateRoute({ authenticated, component: Component }) {
  return authenticated ? (
    Component
  ) : (
    <Navigate to="/signin" state={{ alert: "접근할 수 없는 페이지입니다." }} />
  );
}

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Layout>
            <React.Fragment>
              <Routes>
                {/* 로그인이 필요하지 않은 페이지 */}
                <Route exact path="/" element={<Main />} />
                <Route exact path="/signin" element={<SignIn />} />
                <Route exact path="/info" element={<Info />} />
                <Route exact path="/coffee" element={<Coffee />} />
                <Route exact path="/coffee/:id" element={<CoffeeDetail />} />
                <Route exact path="/coffeechat-open" element={<Coffeeopen />} />
                <Route path="/oauth/info" element={<KakaoRedirectPage />} />
                <Route
                  path="/oauth/login/success"
                  element={<KakaoRedirectPage />}
                />
                <Route path="/fail" element={<SignupFail />} />

                {/* 로그인이 필요한 페이지 */}
                <Route
                  path="/mypage"
                  element={
                    <PrivateRoute
                      authenticated={access}
                      component={<MyPage />}
                    />
                  }
                />
                <Route
                  path="/mypage/infoedit"
                  element={
                    <PrivateRoute
                      authenticated={access}
                      component={<InfoEdit />}
                    />
                  }
                />
                <Route
                  path="/mypage/video"
                  element={
                    <PrivateRoute
                      authenticated={access}
                      component={<FavoritesVideo />}
                    />
                  }
                />
                <Route
                  path="/mypage/withdrawal"
                  element={
                    <PrivateRoute
                      authenticated={access}
                      component={<Withdrawal />}
                    />
                  }
                />
                <Route
                  path="/mypage/coffee"
                  element={
                    <PrivateRoute
                      authenticated={access}
                      component={<MyCoffeeChat />}
                    />
                  }
                />
              </Routes>
            </React.Fragment>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
