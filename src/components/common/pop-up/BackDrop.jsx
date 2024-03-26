import { Box } from '@mui/material';

export function BackDrop({ isVisible, onClick, children }) {
  const fadeInKeyframes = {
    from: { opacity: 0 },
    to: { opacity: 1 },
  };
  return (
    <Box
      sx={{
        display: isVisible ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: '50%',
        zIndex: 5000,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        transform: 'translateX(-50%)', // X축으로 -50% 이동
        ...fadeInKeyframes.to,
        animation: 'fadeIn 0.5s ease-out forwards',
      }}
      onClick={onClick}>
      {children}
    </Box>
  );
}
