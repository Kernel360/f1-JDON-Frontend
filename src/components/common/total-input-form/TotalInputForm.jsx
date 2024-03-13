import { Box, FormLabel, Typography } from '@mui/material';
import { theme } from 'styles/themeMuiStyle';

function HelperText({ value, valid, helperText }) {
  return (
    <Typography
      position="absolute"
      bottom={0}
      left={2}
      fontSize={12}
      color={valid ? theme.palette.primary.main : 'red'}>
      {value && helperText}
    </Typography>
  );
}

function TotalInputForm({ value, label, valid, helperText, children }) {
  return (
    <Box position="relative" p="4px 0 16px" display="flex" flexDirection="column">
      <FormLabel sx={{ fontSize: '14px', fontWeight: 500 }}>{label}</FormLabel>
      {children}
      <HelperText valid={valid} value={value} helperText={helperText} />
    </Box>
  );
}

export default TotalInputForm;
