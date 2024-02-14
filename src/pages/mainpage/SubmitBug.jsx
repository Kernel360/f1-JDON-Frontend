import { theme } from "../../styles/themeMuiStyle";

function SubmitBug() {
  return (
    <>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSfx9-ahkuQtQVy93P_nIhBbip-S4Q6RGnvqH1FeOA_Gu2F-Lg/viewform"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block", // 블록 레벨 요소처럼 만들어 너비와 높이 적용
          height: "60px",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
          lineHeight: "60px", // 텍스트를 버튼 중앙에 위치시킴
          margin: "15px auto",
          background: theme.palette.primary.main, // theme가 정의되어 있어야 함
          fontWeight: 600,
          color: "white",
          fontSize: "18px",
          textDecoration: "none",
          padding: "0 15px", // 좌우 패딩 적용,
        }}
      >
        버그 제출
      </a>
    </>
  );
}

export default SubmitBug;
