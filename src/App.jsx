import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import { Layout } from 'components/layout/Layout';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'styles/themeMuiStyle';
import MyCoffeeChat from 'pages/mypage/MyCoffeeChat';
import FavoritesVideo from 'pages/mypage/FavoritesVideo';
import InfoEdit from 'pages/mypage/InfoEdit';
import MyPage from 'pages/mypage/MyPage';
import { Main } from 'pages/mainpage';
import Withdrawal from 'pages/mypage/Withdrawal';
import React from 'react';
import RedirectPage from 'pages/sign-in/RedirectPage';
import JdAll from 'pages/jd-all';
import { useAuth } from 'pages/mainpage/hooks/useAuth';
import NotFound from 'pages/404';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/atoms';
import CoffeeCreatePage from 'pages/CoffeeCreatePage';
import CoffeeUpdatePage from 'pages/CoffeeUpdatePage';
import CoffeeListPage from 'pages/CoffeeListPage';
import CoffeeDetailPage from 'pages/CoffeeDetailPage';
import SignIn from 'pages/sign-in/SignIn';
import SignUpPage from 'pages/SignUpPage';
import SignUpFailPage from 'pages/SignUpFailPage';
import { JdDetail } from 'pages/jd-detail/JdDetail';

function App() {
  useAuth();
  const localLoginState = localStorage.getItem('isLoggedInState');
  const loginState = useRecoilValue(isLoggedInState);

  const privateRoutes = [
    { path: '/mypage', element: <MyPage /> },
    { path: '/mypage/infoedit', element: <InfoEdit /> },
    { path: '/mypage/video', element: <FavoritesVideo /> },
    { path: '/mypage/withdrawal', element: <Withdrawal /> },
    { path: '/mypage/coffee', element: <MyCoffeeChat /> },
    { path: '/coffeechat-open', element: <CoffeeCreatePage /> },
  ];
  const publicRoutes = [
    { path: '/', element: <Main /> },
    { path: '/signin', element: <SignIn /> },
    { path: '/info', element: <SignUpPage /> },
    { path: '/coffee', element: <CoffeeListPage /> },
    { path: '/coffee/:id', element: <CoffeeDetailPage /> },
    { path: 'edit-coffee/:id', element: <CoffeeUpdatePage /> },
    { path: '/oauth/info', element: <RedirectPage /> },

    // 로그인 리다이렉트 페이지 5가지
    { path: '/oauth/login/success', element: <RedirectPage /> },
    { path: '/oauth/login/fail/not-found-email', element: <SignUpFailPage /> }, // 소셜 이메일을 찾을 수 없을 때
    { path: '/oauth/login/fail/another-withdraw-account', element: <SignUpFailPage /> }, // 다른 소셜 로그인으로 탈퇴한 내역이 존재
    { path: '/oauth/login/fail/already-withdraw-account', element: <SignUpFailPage /> },
    {
      path: '/oauth/login/fail/not-match-provider',
      element: <SignUpFailPage />,
    },

    //
    { path: '/jds', element: <JdAll /> },
    { path: '/jds/:id', element: <JdDetail /> },
    { path: '/fail', element: <SignUpFailPage /> },
    { path: '/*', element: <NotFound /> },
  ];

  const PrivateRoute = ({ localAuth, apiAuth, children }) => {
    return localAuth === 'true' || apiAuth ? (
      children
    ) : (
      <Navigate to="/signin" {...alert('로그인이 필요한 페이지입니다.')} />
    );
  };

  return (
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
                    <PrivateRoute localAuth={localLoginState} apiAuth={loginState.isloginUser}>
                      {route.element}
                    </PrivateRoute>
                  }
                />
              ))}
              {publicRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </React.Fragment>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
