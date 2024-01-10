export const SignInStyles = {
  Button: {
    mt: 5,
    mb: 2,
    p: "10px",
    borderRadius: "999px",
    background: "#6482FF",
    color: "white",
    fontSize: "16px",
    "&:hover": {
      backgroundColor: "black", // 클릭(마우스 오버) 시 배경색 변경
    },
  },
};

export const signInTextFieldStyles = (value) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "10px", // 기본 테두리 두께
      borderColor: value ? "#6482FF" : "#BCBCC4",
    },
    "&:hover fieldset": {
      borderColor: "#6482FF",
    },
    "&.Mui-focused fieldset": {
      borderWidth: "1px",
      borderColor: "#6482FF", // 포커스 시 색상 변경 안 함
    },
  },
  "& .MuiInputBase-input": {
    color: "#6482FF", // 입력된 값의 색상
    "&::placeholder": {
      color: "#BCBCC4", // 플레이스홀더의 색상
      opacity: 1, // 브라우저마다 다른 플레이스홀더 투명도 처리를 일관되게 함
    },
  },
});

export const MainStyles = {
  Tab: {
    fontSize: 18,
    color: "#BCBCC4",
  },
  TabPanel: {
    alignItems: "center",
    padding: "10px 20px",
    position: "relative",
  },
  IconButtonLeft: {
    opacity: 0.3,
    position: "absolute",
    top: "10px",
    left: 0,
    px: 0,
  },
  IconButtonRight: {
    opacity: 0.3,
    position: "absolute",
    top: "10px",
    right: 0,
    px: 0,
  },
  ChipContainer: {
    overflowX: "auto",

    whiteSpace: "nowrap",
    "&::-webkit-scrollbar": {
      display: "none", // 스크롤바 숨기기 (선택적)
    },
  },
  TypoGraphy: {
    fontSize: "18px",
    fontWeight: 500,
    color: "#545459",
    display: "flex",
    alignItems: "center",
  },
  TabIndicator: {
    height: 0, // 언더라인 두께
    borderRadius: "10px",
  },
};

export const ChipStyle = (click) => ({
  color: click ? "#6482FF" : "#ADADAD",
  borderColor: click ? "#6482FF" : "#ADADAD",
  background: click ? "#E2E7FF" : "",
  fontSize: "14px",
  height: "32px",
  borderRadius: "999px",
  "&&:hover": {
    background: "#E2E7FF",
    color: "#6482FF",
    borderColor: "#6482FF",
  },
});

export const URLInput = () => ({
  pt: "10px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "10px", // 기본 테두리 두께
      borderColor: "#BCBCC4",
    },
  },
  "& .MuiInputBase-input": {
    color: "#6482FF", // 입력된 값의 색상
    "&::placeholder": {
      color: "#BCBCC4", // 플레이스홀더의 색상
      opacity: 1, // 브라우저마다 다른 플레이스홀더 투명도 처리를 일관되게 함
    },
  },
});

export const BtnStyle = (value) => ({
  width: "100%",
  height: "55px",
  background: value === "git" ? "black" : "#FEE500",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const SignInStyle = {
  BtnContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: "25px",
    mt: "150px",
  },
  ElemContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
};
