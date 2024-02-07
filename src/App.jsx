import React, { useState } from "react";
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

// const access = localStorage.getItem("isLoggedInState");

const access = localStorage.getItem("isLoggedInState") === "true";

console.log("!!로긴 유무", access);

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(
  //   localStorage.getItem("isLoggedInState") === "true"
  // );

  const PrivateRoute = ({ authenticated, component: Component }) => {
    console.log("확인", authenticated);
    console.log("무가", Component);

    return authenticated ? (
      Component
    ) : (
      <Navigate to="/" {...alert("접근할 수 없는 페이지입니다.")} />
    );
  };
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
