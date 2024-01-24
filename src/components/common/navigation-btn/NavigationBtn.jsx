import { Container, Grid } from "@mui/material";
import { buttonStyle } from "./NavigationBtnStyles";
import NewBtn from "../new-btn/NewBtn";

function NavigationButtons({ step, onNext, onBefore }) {
  return (
    <Container maxWidth="sm" fixed sx={buttonStyle.Container}>
      <Grid container spacing={3} fullWidth sx={buttonStyle.Grid}>
        <Grid item xs={6}>
          <NewBtn title="이전" onClick={onBefore} />
        </Grid>
        <Grid item xs={6}>
          <NewBtn title="다음" onClick={onNext} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default NavigationButtons;
