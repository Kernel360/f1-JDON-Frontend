import { Container, Grid } from "@mui/material";
import { buttonStyle } from "./NavigationBtnStyles";
import NewBtn from "../new-btn/NewBtn";

function NavigationButtons({ onNext, onBefore, isActive }) {
  return (
    <Container maxWidth="sm" sx={buttonStyle.Container}>
      <Grid container spacing={3} fullWidth>
        <Grid item xs={6}>
          <NewBtn title="이전" onClick={onBefore} />
        </Grid>
        <Grid item xs={6}>
          <NewBtn title="다음" onClick={onNext} isActive={isActive} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default NavigationButtons;
