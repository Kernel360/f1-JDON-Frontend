import { BtnStyle } from 'pages/PageStyles';

export function LoginBtn({ social, color, title, logo }) {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_ENDPOINT}/oauth2/authorization/${social}`;
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
        }}>
        <img src={logo} alt="kakao, github아이콘" />
        <span>{title}</span>
      </div>
    </div>
  );
}
