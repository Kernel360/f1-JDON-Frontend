import { Box, Typography } from '@mui/material';

function FormWrapper({ title, children, styles }) {
  return (
    <>
      <Typography fontSize={18} fontWeight={600} paddingTop={1} textAlign="left">
        {title}
      </Typography>
      <Box
        sx={{ ...styles }}
        component="form"
        noValidate
        mt="10px"
        display="flex"
        flexDirection="column"
        gap="13px"
        width="100%">
        {children}
      </Box>
    </>
  );
}

export default FormWrapper;
