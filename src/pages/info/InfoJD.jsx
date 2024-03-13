import { Box, Button, Grid, Typography } from '@mui/material';
import { OptionButton, infoBasicStyles } from './InfoStyles';
import { userInfo } from 'recoil/atoms';
import { useRecoilState } from 'recoil';

function InFoJD({ onChange, jobCategory }) {
  const [value, setValue] = useRecoilState(userInfo);
  const handleInputChange = (field, newValue) => {
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
          <Grid container sx={infoBasicStyles.genderBtnContainer}>
            {jobCategory.map((item) => (
              <Grid item xs={5.5} key={item.id}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handleInputChange('jobCategoryId', item.id)}
                  sx={OptionButton(value.jobCategoryId === item.id)}>
                  {item.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default InFoJD;
