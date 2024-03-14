import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useSetErrorMsg() {
  const [pageText, setPageText] = useState('');
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes('/not-found-email'))
      setPageText('소셜 서비스에 이메일을 등록해야 서비스를 이용할 수 있습니다.');
    if (pathname.includes('/not-match-provider'))
      setPageText('이미 다른 소셜 계정으로 가입된 상태입니다.');
    if (pathname.includes('/another-withdraw-account'))
      setPageText('다른 소셜 계정으로 탈퇴한 내역이 존재합니다.');
    if (pathname.includes('/already-withdraw-account')) setPageText('이미 탈퇴 처리된 계정입니다.');

    // eslint-disable-next-line
  }, []);
  return { pageText };
}
