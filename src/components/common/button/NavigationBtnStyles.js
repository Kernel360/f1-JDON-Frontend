import { theme } from 'styles/themeMuiStyle';

export const buttonStyle = {
  Container: {
    position: 'absolute', // 화면 중앙에 위치하기 위해 'absolute' 사용
    bottom: 10, // 화면 하단에서의 위치
    left: '50%', // 화면 중앙에 위치
    background: 'white',
    transform: 'translateX(-50%)', // 정확한 중앙 정렬을 위한 변환
  },

  Button: {
    mt: 5,
    mb: 2,
    p: '13px',
    borderRadius: '999px',
    background: '#EBEBEB',
    color: '#BCBCC4',
    fontSize: '16px',
    '&:hover': {
      color: '#ffffff',
      backgroundColor: '#6482FF', // 클릭(마우스 오버) 시 배경색 변경
    },
  },
  ActiveButton: {
    color: '#ffffff',
    backgroundColor: '#6482FF',
  },
  DeleteButton: {
    color: '#ffffff',
    backgroundColor: '#f33',
    '&:hover': {
      color: '#ffffff',
      backgroundColor: '#f33', // 클릭(마우스 오버) 시 배경색 변경
    },
  },
  EndButton: {
    mt: 7,
    mb: 2,
    width: '60%',
    p: '13px',
    borderRadius: '999px',
    background: '#6482FF',
    color: '#ffffff',
    fontSize: '16px',
    '&:hover': {
      color: '#ffffff',
      backgroundColor: '#6482FF',
    },
  },
};

export const CommonButtonStyle = (isActive) => ({
  mt: 5,
  mb: 2,
  p: '13px',
  borderRadius: '999px',
  background: isActive ? theme.palette.primary.main : '#EBEBEB',
  color: isActive ? 'white' : '#BCBCC4',
  fontSize: '16px',
  '&:hover': {
    background: theme.palette.primary.main,
    color: 'white',
  },
});
