import { BtnStyle } from '../PageStyles';

export function LoginBtn({ social, color, title, logo }) {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorization/${social}`;
  };

  return (
    <div onClick={handleLogin} style={BtnStyle(social)}>
      <div
        style={{
          color: color,
          fontSize: '14px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        <img src={logo} alt="kakao" />
        <span>{title}</span>
      </div>
    </div>
  );
}
