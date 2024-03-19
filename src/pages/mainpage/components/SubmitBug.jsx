import { bugBtnStyle } from '../style';

function SubmitBug() {
  return (
    <div style={{ textAlign: 'left' }}>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSfx9-ahkuQtQVy93P_nIhBbip-S4Q6RGnvqH1FeOA_Gu2F-Lg/viewform"
        target="_blank"
        rel="noopener noreferrer"
        style={bugBtnStyle}>
        버그 제출
      </a>
    </div>
  );
}

export default SubmitBug;
