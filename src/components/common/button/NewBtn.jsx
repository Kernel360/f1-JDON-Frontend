import { Button } from '@mui/material';
import { theme } from 'styles/themeMuiStyle';

function NewBtn({ title, onClick, isActive, styles, disable }) {
  return (
    <Button
      type="submit"
      fullWidth
      disabled={disable}
      sx={{
        mt: 5,
        mb: 2,
        p: '13px',
        borderRadius: '999px',
        background: isActive ? theme.palette.primary.main : '#EBEBEB',
        color: isActive ? 'white' : '#BCBCC4',
        fontSize: '16px',
        '&:hover': {
          background: theme.palette.primary.main,
          color: 'white',
        },
        ...styles,
      }}
      onClick={onClick}>
      {title}
    </Button>
  );
}
export default NewBtn;
