import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/atoms';

export const useLoginCheckAndRedirect = () => {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(isLoggedInState).isLoginUser;

  const handleConfirm = () => {
    if (
      window.confirm(
        '커피챗 생성은 로그인 후 사용하실 수 있습니다. \n로그인 페이지로 이동하시겠습니까?',
      )
    ) {
      navigate('/signin');
    }
  };

  const handleLoginCheckAndRedirect = () => {
    if (!isLogin) {
      handleConfirm();
      return;
    }
    navigate('/coffeechat-open');
  };

  return handleLoginCheckAndRedirect;
};
