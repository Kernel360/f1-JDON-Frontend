import { theme } from 'styles/themeMuiStyle';

import ShareIcon from '@mui/icons-material/Share';
import { Box, Button } from '@mui/material';

import useClipboardCopy from '../queryHooks/useClipboardCopy';
import { CoffeeDetailStyles } from '../styles';

function URLShareButton() {
  const [, handleCopyClick] = useClipboardCopy();

  const onCopyButtonClick = () => {
    handleCopyClick(window.location.href);
    alert('URL이 복사되었습니다');
  };

  return (
    <Box>
      <Button sx={CoffeeDetailStyles.ShareButton} onClick={onCopyButtonClick}>
        <ShareIcon sx={{ color: theme.palette.primary.main }} />
      </Button>
    </Box>
  );
}

export default URLShareButton;
