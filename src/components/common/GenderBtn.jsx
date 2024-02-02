import React, { useState, useEffect } from "react";
import { Box, Button, FormLabel, Grid } from "@mui/material";
import { infoBasicStyles } from "../../pages/info/InfoStyles";

const GenderBtn = ({ initialGender, handleSexChange }) => {
  const [selectedGender, setSelectedGender] = useState("");

  useEffect(() => {
    // 부모 컴포넌트에서 전달된 초기 성별 값이 변경되면 업데이트
    if (initialGender === "남성") {
      setSelectedGender("남");
      handleSexChange("남");
    } else if (initialGender === "여성") {
      setSelectedGender("여");
      handleSexChange("여");
    }
  }, [initialGender, handleSexChange]);

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
