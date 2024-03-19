import { Box, Typography } from '@mui/material';
import back from 'assets/icons/btn_back.svg';
import { COFFEE_MYPAGE_CHILD } from 'constants/headerProps';
import { useNavigate } from 'react-router-dom';

/**
 * @function Header - 각 하위 페이지별 상단에 존재하는 공통 레이아웃 컴포넌트입니다.
 * @summary - 각 페이지별 상세페이지에서 default 페이지 (목록페이지)로 넘어갈 수 있는 버튼을 제공합니다.
 * @param title - 이전 페이지의 위치를 나타내는 텍스트입니다. `ex) 목록 페이지로, 마이페이지로`
 * @param url - 버튼을 눌렀을 때 이동할 라우터의 주소입니다.
 */
function Header({ title, url }) {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate(url);
    if (url === COFFEE_MYPAGE_CHILD.url) localStorage.removeItem('back_path')
  };
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Box onClick={goBackHandler} sx={{ py: 3, display: 'flex', gap: 2, cursor: 'pointer' }}>
          <img src={back} alt="뒤로가기 아이콘" />
          <Typography fontSize="1rem" fontWeight={400}>
            {title}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
export default Header;
