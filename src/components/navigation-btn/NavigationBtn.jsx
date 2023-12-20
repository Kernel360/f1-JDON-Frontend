import { Button, Grid } from "@mui/material";
import { buttonStyle } from "./NavigationBtnStyles";

export function NavigationButtons() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Button type="submit" fullWidth sx={buttonStyle}>
          이전
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button type="submit" fullWidth sx={buttonStyle}>
          다음
        </Button>
      </Grid>
    </Grid>
  );
}
