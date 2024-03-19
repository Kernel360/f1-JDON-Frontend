import { theme } from 'styles/themeMuiStyle';

export const titleStyle = ({ style }) => ({
  color: 'black',
  fontWeight: 700,
  marginRight: '7px',
  maxWidth: '100%',
  fontSize: '18px',
  wordWrap: 'break-word',
  whiteSpace: 'normal',
  overflowWrap: 'break-word',
  ...style,
});

export const videoContainer = () => ({
  background: '#F9F9F9',
  borderRadius: '10px',
  mt: 2,
  width: '100%',
});

export const messageStyle = () => ({
  fontSize: '16px',
  color: '#B9B9B9',
  fontWeight: 600,
  textAlign: 'center',
  padding: '100px 0',
});

export const bugBtnStyle = {
  display: 'inline-block',
  height: '60px',
  borderRadius: '10px',
  width: '40%',
  textAlign: 'center',
  lineHeight: '60px',
  margin: '15px auto',
  background: theme.palette.primary.main, // theme.palette.primary.main을 대체하는 색상 값
  fontWeight: 600,
  color: 'white',
  fontSize: '16px',
  textDecoration: 'none',
  padding: '0 15px',
};
