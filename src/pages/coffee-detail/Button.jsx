import { Button, Container, Grid } from "@mui/material";
import { buttonStyle } from "./ButtonStyle";
import share from "../../assets/icons/btn_share.svg";

function Buttons() {
  return (
    <Container maxWidth="md" fixed sx={buttonStyle.Container}>
      <Grid container spacing={3}>
        <Grid item xs={3} sm={3} md={3}>
          <Button type="submit" fullWidth sx={buttonStyle.ShareButton}>
            <img src={share} alt="공유하기" />
          </Button>
        </Grid>
        <Grid item xs={9} sm={9} md={9}>
          <Button type="submit" fullWidth sx={buttonStyle.Button}>
            신청하기
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Buttons;
