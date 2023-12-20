import { createTheme } from "@mui/material/styles";

export const infoBasicTheme = createTheme({
  components: {
    // TextField에 대한 스타일 정의
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderRadius: "10px", // 기본 테두리 두께
            },
            "&:hover fieldset": {
              borderColor: "#6482FF",
            },
            "&.Mui-focused fieldset": {
              borderWidth: "2px",
              borderColor: "#6482FF", // 포커스 시 색상 변경 안 함
            },
          },
        },
      },
    },
    // Button에 대한 스타일 정의
    MuiButton: {
      styleOverrides: {
        root: {
          height: 56,
          borderRadius: "10px",
          borderColor: "#BCBCC4",
          color: "#BCBCC4",
          "&:hover": {
            backgroundColor: "#E2E7FF", // 클릭 시 배경색
            color: "#6482FF", // 클릭 시 텍스트 색
          },
        },
      },
    },
    // 여기에 필요한 다른 컴포넌트 스타일 추가 가능
  },
});

// 다른 스타일 정의도 추가 가능
