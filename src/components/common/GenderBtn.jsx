import React, { useState } from "react";
import { Box, Button, FormLabel, Grid } from "@mui/material";
import { infoBasicStyles } from "../../pages/info/InfoStyles";

const GenderBtn = ({ handleSexChange }) => {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleClick = (gender) => {
    setSelectedGender(gender === selectedGender ? null : gender);
    handleSexChange(gender === selectedGender ? null : gender);
  };

  return (
    <Box>
      <FormLabel>성별</FormLabel>
      <Grid container sx={infoBasicStyles.genderBtnContainer}>
        {["남", "여"].map((gender, index) => (
          <Grid item xs={5.5}>
            <Button
              key={index}
              variant="outlined"
              fullWidth
              onClick={() => handleClick(gender)}
              sx={{
                ...infoBasicStyles.genderButton,
                ...(selectedGender === gender &&
                  infoBasicStyles.clickedGenderButton),
              }}
            >
              {gender}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GenderBtn;
