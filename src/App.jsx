import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { Helmet } from "react-helmet";
import SignIn from "./pages/sign-in/SignIn";
import Info from "./pages/info/InFo";
import { Layout } from "./components/layout/Layout";
import { ThemeProvider } from "@mui/material/styles";
import { Coffee } from "./pages/coffeechat/Coffee";
import { theme } from "./styles/themeMuiStyle";
import CoffeeDetail from "./pages/coffee-detail/CoffeeDetail";
import Coffeeopen from "./pages/coffeechat/CoffeeOpen";
import SignupFail from "./pages/info/SignupFail";
import MyCoffeeChat from "./pages/mypage/MyCoffeeChat";
import FavoritesVideo from "./pages/mypage/FavoritesVideo";
import InfoEdit from "./pages/mypage/InfoEdit";
import MyPage from "./pages/mypage/MyPage";
import { Main } from "./pages/mainpage/Main";
import Withdrawal from "./pages/mypage/Withdrawal";
import React, { useState, useEffect } from "react";
import RedirectPage from "./pages/sign-in/RedirectPage";
import UpdateCoffeeForm from "./pages/coffee-detail/UpdateCoffeeForm";

function App() {
  const [access, setAccess] = useState(
    localStorage.getItem("isLoggedInState") === "true"
  );

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedInState") === "true";
    setAccess(isLoggedIn);
  }, [access]);

  const privateRoutes = [
    { path: "/mypage", element: <MyPage /> },
    { path: "/mypage/infoedit", element: <InfoEdit /> },
    { path: "/mypage/video", element: <FavoritesVideo /> },
    { path: "/mypage/withdrawal", element: <Withdrawal /> },
    { path: "/mypage/coffee", element: <MyCoffeeChat /> },
  ];
  const publickRoutes = [
    { path: "/", element: <Main /> },
    { path: "/signin", element: <SignIn /> },
    { path: "/info", element: <Info /> },
    { path: "/coffee", element: <Coffee /> },
    { path: "/coffee/:id", element: <CoffeeDetail /> },
    { path: "edit-coffee/:id", element: <UpdateCoffeeForm /> },
    { path: "/coffeechat-open", element: <Coffeeopen /> },
    { path: "/oauth/info", element: <RedirectPage /> },
    { path: "/oauth/login/success", element: <RedirectPage /> },
    { path: "/fail", element: <SignupFail /> },
  ];

  const PrivateRoute = ({ authenticated, children }) => {
    return authenticated ? (
      children
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
                {privateRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <PrivateRoute authenticated={access}>
                        {route.element}
                      </PrivateRoute>
                    }
                  />
                ))}
                {publickRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </React.Fragment>
            <Helmet>
              <title>JDON</title>
              <meta
                name="description"
                content="최근 채용공고에 많이 언급된 직군별 기술스택에 맞는 영상을 추천 사이트"
              />
              <meta name="keywords" content="개발자, 채용, 커피챗" />
            </Helmet>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
