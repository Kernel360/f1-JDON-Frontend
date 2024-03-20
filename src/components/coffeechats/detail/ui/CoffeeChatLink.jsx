import { URLInput } from 'pages/PageStyles';

import FileCopyIcon from '@mui/icons-material/FileCopy';

const { TextField, InputAdornment, Button, Typography } = require('@mui/material');
const { default: TotalInputForm } = require('components/common/input/TotalInputForm');

function CoffeeDetailChatLink({ hasAuthenticate, openChatUrl, isCopied, inputRef, onCopy }) {
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
              <Button onClick={onCopy}>
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
