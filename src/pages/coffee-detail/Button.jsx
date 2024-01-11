import { Box, Button, Grid } from "@mui/material";
import { buttonStyles } from "./ButtonStyle";
import share from "../../assets/icons/btn_share.svg";

function Buttons() {
  return (
    <Box sx={buttonStyles.Container}>
      <Grid container spacing={3}>
        <Grid item xs={3} sm={3}>
          <Button type="submit" fullWidth sx={buttonStyles.ShareButton}>
            <img src={share} alt="공유하기" />
          </Button>
        </Grid>
        <Grid item xs={9} sm={9}>
          <Button type="submit" fullWidth sx={buttonStyles.Button}>
            신청하기
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Buttons;
