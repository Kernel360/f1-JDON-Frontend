import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#6482FF",
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
  },
});
