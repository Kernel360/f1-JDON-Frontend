import TotalInputForm from 'components/common/input/TotalInputForm';
import { URLInput } from 'pages/PageStyles';

import FileCopyIcon from '@mui/icons-material/FileCopy';

import useClipboardCopy from '../queryHooks/useClipboardCopy';

const { TextField, InputAdornment, Button, Typography } = require('@mui/material');

function CoffeeDetailChatLink({ hasAuthenticate, openChatUrl, inputRef }) {
  const [isCopied, handleCopyClick] = useClipboardCopy();

  const onCopyButtonClick = () => {
    handleCopyClick(openChatUrl);
  };

  return (
    <TotalInputForm value={false} label="오픈채팅 링크">
      <TextField
        InputLabelProps={{ shrink: true }}
        sx={URLInput}
        ref={inputRef}
        value={hasAuthenticate ? openChatUrl : '신청 후 확인 가능합니다'}
        InputProps={{
          readOnly: true,
          disabled: true,
          endAdornment: hasAuthenticate && (
            <InputAdornment position="end" sx={{ background: 'transparent' }}>
              <Button onClick={onCopyButtonClick}>
                {isCopied ? (
                  <Typography sx={{ fontSize: '12px' }}>Copied!</Typography>
                ) : (
                  <FileCopyIcon sx={{ fontSize: 20, color: '#BCBCC4' }} />
                )}
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </TotalInputForm>
  );
}
export default CoffeeDetailChatLink;
