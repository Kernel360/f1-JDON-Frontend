import { Button, Container, Grid } from "@mui/material";
import { buttonStyle } from "./NavigationBtnStyles";

function NavigationButtons({ step, onNext, onBefore }) {
  return (
    <Container maxWidth="sm" fixed sx={buttonStyle.Container}>
      <Grid container spacing={3} fullWidth sx={buttonStyle.Grid}>
        <Grid item xs={6}>
          <Button
            type="submit"
            fullWidth
            sx={buttonStyle.Button}
            onClick={onBefore}
          >
            이전
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            type="submit"
            fullWidth
            disabled={step > 3}
            sx={buttonStyle.Button}
            onClick={onNext}
          >
            다음
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default NavigationButtons;
