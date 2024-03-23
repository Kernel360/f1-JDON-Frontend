import URLShareButton from 'components/coffeechats/detail/ui/URLShareButton';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/atoms';

import {
  Box,
  Grid,
} from '@mui/material';

import { CoffeeDetailStyles } from '../styles';
import ApplyButton from './button/ApplyButton';
import EditButton from './button/EditButton';
import RemoveButton from './button/RemoveButton';

function CoffeeDetailButtons({ coffeeChatId, coffeeChatData }) {
  const loginState = useRecoilValue(isLoggedInState);

  const isButtonDisables = coffeeChatData?.status !== '모집중' || coffeeChatData.isParticipant;
  const host = coffeeChatData?.hostId === loginState.memberId;

  return (
    <Box sx={CoffeeDetailStyles.Container}>
      <Box sx={CoffeeDetailStyles.BtnsContainer}>
        <Grid item xs={8} sm={8} sx={{ display: 'flex', gap: '12px', flexGrow: 1 }}>
          {host ? (
            <>
              <EditButton title="수정하기" id={coffeeChatId} coffeeChatData={coffeeChatData} />
              <RemoveButton
                title="삭제하기"
                id={coffeeChatId}
                coffeeChatData={coffeeChatData}
                isDisable={isButtonDisables}
              />
            </>
          ) : (
            <ApplyButton title="신청하기" id={coffeeChatId} coffeeChatData={coffeeChatData} />
          )}
        </Grid>
        <URLShareButton />
      </Box>
    </Box>
  );
}

export default CoffeeDetailButtons;
