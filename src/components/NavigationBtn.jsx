import { Button, Grid } from "@mui/material";

export function NavigationButtons() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Button
          type="submit"
          fullWidth
          sx={{
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
          }}
        >
          이전
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          type="submit"
          fullWidth
          sx={{
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
          }}
        >
          다음
        </Button>
      </Grid>
      <Grid
        item
        sx={{
          textAlign: "right",
          width: "100%",
          margin: "30px 0",
        }}
      ></Grid>
    </Grid>
  );
}
