import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { instance } from '../../api/api';
import { useRecoilState } from 'recoil';
import { userInfo } from '../../recoil/atoms';

const RedirectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useRecoilState(userInfo);

  useEffect(() => {
    localStorage.setItem('isLoggedInState', false);
    const searchParams = new URLSearchParams(location.search);
    console.log(searchParams);
    const errorMessage = searchParams.get('error_message');

    // 에러 메시지가 있으면 알림
    if (errorMessage) {
      alert(errorMessage);
    }
    const value = searchParams.get('value');
    const hmac = searchParams.get('hmac');
    const code = searchParams.get('code');
    console.log(value, hmac, code);
    if (hmac) {
      navigate('/info');
      setData((prev) => ({ ...prev, encrypted: value, hmac: hmac }));
    } else {
      navigate('/');
      localStorage.setItem('isLoggedInState', true);
    }
  }, [location, navigate]);

  return (
    <div>
      <div>Processing...</div>
    </div>
  );
};

export default RedirectPage;
