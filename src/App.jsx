import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SignIn from 'pages/sign-in/SignIn';
import Info from 'pages/info/InFo';
import { Layout } from 'components/layout/Layout';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'styles/themeMuiStyle';
import SignupFail from 'pages/info/SignupFail';
import MyCoffeeChat from 'pages/mypage/MyCoffeeChat';
import FavoritesVideo from 'pages/mypage/FavoritesVideo';
import InfoEdit from 'pages/mypage/InfoEdit';
import MyPage from 'pages/mypage/MyPage';
import { Main } from 'pages/mainpage/Main';
import Withdrawal from 'pages/mypage/Withdrawal';
import React from 'react';
import RedirectPage from 'pages/sign-in/RedirectPage';
import { JdDetail } from 'pages/jd-detail/JdDetail';
import { FailPage } from 'pages/sign-in/FailPage';
import JdAll from 'pages/jd-all';
import { useAuth } from 'pages/mainpage/hooks/useAuth';
import NotFound from 'pages/404';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/atoms';
import Coffeeopen from 'pages/coffeechats/create-coffeechats';
import { Coffee } from 'pages/coffeechats/coffeechat-list';
import CoffeeDetail from 'pages/coffeechats/detail-coffeechats';
import UpdateCoffeeForm from 'pages/coffeechats/update-coffeechats';

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
    { path: '/coffeechat-open', element: <Coffeeopen /> },
  ];
  const publicRoutes = [
    { path: '/', element: <Main /> },
    { path: '/signin', element: <SignIn /> },
    { path: '/info', element: <Info /> },
    { path: '/coffee', element: <Coffee /> },
    { path: '/coffee/:id', element: <CoffeeDetail /> },
    { path: 'edit-coffee/:id', element: <UpdateCoffeeForm /> },
    { path: '/oauth/info', element: <RedirectPage /> },

    // 로그인 리다이렉트 페이지 5가지
    { path: '/oauth/login/success', element: <RedirectPage /> },
    { path: '/oauth/login/fail/not-found-email', element: <FailPage /> }, // 소셜 이메일을 찾을 수 없을 때
    { path: '/oauth/login/fail/another-withdraw-account', element: <FailPage /> }, // 다른 소셜 로그인으로 탈퇴한 내역이 존재
    { path: '/oauth/login/fail/already-withdraw-account', element: <FailPage /> },
    {
      path: '/oauth/login/fail/not-match-provider',
      element: <FailPage />,
    },

    //
    { path: '/jds', element: <JdAll /> },
    { path: '/jds/:id', element: <JdDetail /> },
    { path: '/fail', element: <SignupFail /> },
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
