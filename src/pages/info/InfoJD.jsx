import { Box, Button, Grid, Typography } from "@mui/material";
import { infoBasicStyles } from "./InfoStyles";
import { useEffect, useState } from "react";
import { getJobCategory } from "../../api/api";

function InFoJD({ jobCategoryId, step, onChange }) {
  const [value, setValue] = useState({ jobCategoryId });
  const newValue = [];
  const handleChange = (field, newValue) => {
    setValue((prev) => ({ ...prev, [field]: newValue }));
    onChange({ [field]: newValue });
  };

  return (
    <>
      <Typography width="100%" sx={infoBasicStyles.typographyTitle}>
        직무를 선택해주세요
      </Typography>
      <Typography width="100%" sx={infoBasicStyles.typographySubtitle}>
        직무 타입은 추후 추가될 예정입니다
      </Typography>
      <Box component="form" noValidate sx={infoBasicStyles.formContainer}>
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
                onClick={() => handleChange("jobCategoryId", "1")}
                sx={infoBasicStyles.genderButton}
              >
                {newValue[0].name}
              </Button>
            </Grid>
            <Grid item xs={5.5}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleChange("jobCategoryId", "2")}
                sx={infoBasicStyles.genderButton}
              >
                {newValue[1].name}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default InFoJD;
