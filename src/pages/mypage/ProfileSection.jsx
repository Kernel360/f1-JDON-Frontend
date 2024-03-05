import profile from "assets/profile.svg";
import edit from "assets/images/icn_edit.svg";
const { Grid, Avatar, Typography, IconButton } = require("@mui/material");
const { Link } = require("react-router-dom");

function ProfileSection({ data }) {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      marginBottom={5}
    >
      <Grid
        item
        xs={12}
        sm={10}
        container
        direction="column"
        spacing={2}
        alignItems="center"
      >
        <Grid item>
          <Avatar
            alt="user profile"
            src={profile}
            sx={{
              background: "inherit",
              width: "45px",
              height: "45px",
              p: 1,
              border: "1px solid #FEC93A",
            }}
          />
        </Grid>
        <Grid item container alignItems="center" justifyContent="center">
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              marginLeft: "1.375rem",
              fontWeight: "600",
            }}
          >
            {data.nickname || "불러오는 중.."}
          </Typography>
          <Link to={{ pathname: "/mypage/infoedit", state: { data: data } }}>
            <IconButton
              aria-label="정보수정"
              color="black"
              style={{
                backgroundImage: `url(${edit})`,
                backgroundSize: "cover",
                margin: "11px",
                width: "17px",
                height: "17px",
              }}
            ></IconButton>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfileSection;
