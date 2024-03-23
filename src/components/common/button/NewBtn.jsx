import { Button } from '@mui/material';

import { CommonButtonStyle } from './NavigationBtnStyles';

function NewBtn({ title, onClick, isActive, styles, disable }) {
  return (
    <Button
      type="submit"
      fullWidth
      disabled={disable}
      sx={{ ...CommonButtonStyle(isActive), ...styles }}
      onClick={onClick}>
      {title}
    </Button>
  );
}
export default NewBtn;
