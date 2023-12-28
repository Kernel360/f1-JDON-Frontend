import { Box, Button, Grid, Typography } from "@mui/material";
import { infoBasicStyles } from "./InfoStyles";

export function InFoJD({ jd }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <>
      <Typography width="100%" sx={infoBasicStyles.typographyTitle}>
        직무를 선택해주세요
      </Typography>
      <Typography width="100%" sx={infoBasicStyles.typographySubtitle}>
        직무 타입은 추후 추가될 예정입니다
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={infoBasicStyles.formContainer}
      >
        <Box>
          <Grid
            container
            sx={{
              justifyContent: "space-between",
              m: "10px auto",
              "& .MuiGrid-item": {
                padding: 0,
              },
            }}
          >
            <Grid item xs={5.5}>
              <Button
                variant="outlined"
                fullWidth
                sx={infoBasicStyles.genderButton}
              >
                Font-end
              </Button>
            </Grid>
            <Grid item xs={5.5}>
              <Button
                variant="outlined"
                fullWidth
                sx={infoBasicStyles.genderButton}
              >
                Back-end
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
