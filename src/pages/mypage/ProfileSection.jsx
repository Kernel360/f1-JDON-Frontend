import { Avatar, Grid, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import ProfileIcon from 'assets/images/ProfileIcon';

function ProfileSection({ data }) {
  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center" marginBottom={5}>
      <Grid item xs={12} sm={10} container direction="column" spacing={2} alignItems="center">
        <Grid item>
          <Avatar
            alt="user profile"
            sx={{
              background: 'inherit',
              width: '45px',
              height: '45px',
              p: 1,
              border: '1px solid #FEC93A',
            }}>
            <ProfileIcon />
          </Avatar>
        </Grid>
        <Grid item container alignItems="center" justifyContent="center">
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              marginLeft: '1.375rem',
              fontWeight: '600',
            }}>
            {data.nickname || '불러오는 중..'}
          </Typography>
          <Link to={{ pathname: '/mypage/infoedit', state: { data: data } }}>
            <IconButton
              // aria-label="정보수정"
              // color="black"
              style={{
                // backgroundImage: `url(${edit})`,
                // backgroundSize: 'cover',
                margin: '11px',
                width: '17px',
                height: '17px',
              }}>
              <EditIcon />
            </IconButton>
          </Link>
          {/* <PencilIcon /> */}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfileSection;
