import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#6482FF",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        "& .nav-btn": {
          root: {
            mt: "50px",
            mb: 2,
            p: "13px",
            borderRadius: "999px",
            background: "#6482FF",
            color: "white",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "black", // 클릭(마우스 오버) 시 배경색 변경
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderRadius: "10px", // 기본 테두리 두께
              //  borderColor: id ? "#6482FF" : "#BCBCC4",
            },
            "&:hover fieldset": {
              borderColor: "#6482FF",
            },
            "&.Mui-focused fieldset": {
              borderWidth: "1px",
              borderColor: "#6482FF", // 포커스 시 색상 변경 안 함
            },

            "& .MuiInputBase-input": {
              color: "#6482FF", // 입력된 값의 색상
              borderColor: "#6482FF",
              "&::placeholder": {
                color: "#BCBCC4", // 플레이스홀더의 색상
                opacity: 1, // 브라우저마다 다른 플레이스홀더 투명도 처리를 일관되게 함
              },
            },
          },
        },
      },
    },
  },
});
