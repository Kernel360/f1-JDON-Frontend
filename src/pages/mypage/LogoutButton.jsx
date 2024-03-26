import { logoutMember } from 'api/api';
import { useNavigate } from 'react-router-dom';

const { Button } = require('@mui/material');

function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logoutMember();
      localStorage.setItem('isLoggedInState', false);
      navigate('/');
    } catch (error) {
      console.error('로그아웃 에러', error);
    }
  };

  return (
    <Button
      position="sticky"
      bottom="0"
      variant="secondary"
      size="large"
      onClick={handleLogout}
      sx={{
        width: '100%',
        backgroundColor: '#EBEBEB',
        fontSize: '1.05rem',
        p: '13px',
        borderRadius: 10,
        color: 'gray',
      }}>
      로그아웃
    </Button>
  );
}

export default LogoutButton;
