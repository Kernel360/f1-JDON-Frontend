import { duplicateCheckButtonStyle } from 'pages/info/InfoStyles';

import { Button, InputAdornment } from '@mui/material';

const DuplicateCheckButton = ({ onClick, text }) => {
  return (
    <InputAdornment position="end" sx={{ background: 'transparent' }}>
      <Button onClick={onClick} sx={duplicateCheckButtonStyle}>
        {text}
      </Button>
    </InputAdornment>
  );
};

export default DuplicateCheckButton;
