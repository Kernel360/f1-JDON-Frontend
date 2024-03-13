import { theme } from 'styles/themeMuiStyle';

function SubmitBug() {
  return (
    <div style={{ textAlign: 'left' }}>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSfx9-ahkuQtQVy93P_nIhBbip-S4Q6RGnvqH1FeOA_Gu2F-Lg/viewform"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          height: '60px',
          borderRadius: '10px',
          width: '40%',
          textAlign: 'center',
          lineHeight: '60px',
          margin: '15px auto',
          background: theme.palette.primary.main,
          fontWeight: 600,
          color: 'white',
          fontSize: '16px',
          textDecoration: 'none',
          padding: '0 15px',
        }}>
        버그 제출
      </a>
    </div>
  );
}

export default SubmitBug;
