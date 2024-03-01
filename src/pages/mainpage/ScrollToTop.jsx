import { Box } from '@mui/material';
import topIcon from 'assets/icons/aroww-top.svg';
import { useEffect, useState } from 'react';

function ScrollToTop({ topRef }) {
  const [isSlideUp, setIsSlideUp] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    topRef.current.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      setShowButton(false);
      setIsSlideUp(false);
    }, 300);
  };
  const toggleVisibility = () => {
    const shouldBeVisible = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1000;
    setIsSlideUp(shouldBeVisible);
    if (shouldBeVisible) {
      setShowButton(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    showButton && (
      <Box
        sx={{
          position: 'fixed',
          right: 16,
          bottom: 100,
          zIndex: 1000,
        }}
      >
        <button
          onClick={scrollToTop}
          style={{
            padding: 8,
            border: 'none',
            borderRadius: '999px',
            width: 48,
            height: 48,
            cursor: 'pointer',
            background: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            animation: `${isSlideUp ? 'slideUp' : 'slideDown'} 0.3s ease-out forwards`,
          }}
        >
          <img src={topIcon} alt="위로가기" />
        </button>
      </Box>
    )
  );
}

export default ScrollToTop;
