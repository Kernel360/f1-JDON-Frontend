import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#3A79F3",
      point: "#FF814D",
      gray500: "#BCBCC4",
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

    overrides: {
      MuiToolbar: {
        root: {
          padding: "0",
          // 미디어 쿼리를 사용하여 화면 크기가 600px 이상인 경우에만 패딩을 추가
          [`@media (min-width: ${600}px)`]: {
            padding: "0px",
          },
        },
      },
    },
  },
});
