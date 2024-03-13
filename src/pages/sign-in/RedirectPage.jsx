import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfo } from 'recoil/atoms';

const RedirectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [, setData] = useRecoilState(userInfo);

  useEffect(() => {
    localStorage.setItem('isLoggedInState', false);
    const searchParams = new URLSearchParams(location.search);

    const value = searchParams.get('value');
    const hmac = searchParams.get('hmac');

    if (hmac) {
      navigate('/info');
      setData((prev) => ({ ...prev, encrypted: value, hmac: hmac }));
    } else {
      navigate('/');
      localStorage.setItem('isLoggedInState', true);
    }
  }, [location, navigate, setData]);

  return (
    <div>
      <div>Processing...</div>
    </div>
  );
};

export default RedirectPage;
