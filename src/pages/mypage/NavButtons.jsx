import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function NavItem({ link, text }) {
  return (
    <Link to={link}>
      <Button
        sx={{ fontSize: '17px', paddingY: '12px', borderRadius: '8px' }}
        variant="contained"
        color="primary"
        fullWidth
        disableElevation>
        {text}
      </Button>
    </Link>
  );
}

function NavButtons() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <NavItem link="/mypage/video" text="찜" />
      </Grid>
      <Grid item xs={6}>
        <NavItem link="/mypage/coffee" text="커피챗" />
      </Grid>
    </Grid>
  );
}
export default NavButtons;
