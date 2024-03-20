import { Button } from '@mui/material';

import { useLoginCheckAndRedirect } from '../queryHooks/useLoginCheckAndRedirect';
import { newBtnStyle } from '../style';

function CreateCoffeeChatButton() {
  const handleLoginCheckAndRedirect = useLoginCheckAndRedirect();

  return (
    <Button
      variant="contained"
      disableElevation
      sx={newBtnStyle}
      onClick={handleLoginCheckAndRedirect}>
      + New
    </Button>
  );
}
export default CreateCoffeeChatButton;
