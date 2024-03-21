import URLShareButton from 'components/coffeechats/Detail/ui/URLShareButton';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/atoms';

import { Box, Grid } from '@mui/material';

import useFetchCoffeeChatDetail from '../queryHooks/useFetchcCoffeeChatDetail';
import { CoffeeDetailStyles } from '../styles';
import ApplyButton from './button/ApplyButton';
import EditButton from './button/EditButton';
import RemoveButton from './button/RemoveButton';

function CoffeeDetailButtons({ id }) {
  const loginState = useRecoilValue(isLoggedInState);
  const { coffeeChatData, isParticipant, setIsParticipant } = useFetchCoffeeChatDetail(id);
  const isButtonDisables = coffeeChatData?.status !== '모집중' || isParticipant;
  const host = coffeeChatData?.hostId === loginState.memberId;

  return (
    <Box sx={CoffeeDetailStyles.Container}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '20px',
        }}>
        <Grid item xs={8} sm={8} sx={{ display: 'flex', gap: '12px', flexGrow: 1 }}>
          {host ? (
            <>
              <EditButton
                title="수정하기"
                id={id}
                coffeeChatData={coffeeChatData}
                setIsParticipant={setIsParticipant}
              />
              <RemoveButton
                title="삭제하기"
                id={id}
                coffeeChatData={coffeeChatData}
                isDisable={isButtonDisables}
              />
            </>
          ) : (
            <ApplyButton title="신청하기" id={id} />
          )}
        </Grid>
        <URLShareButton />
      </Box>
    </Box>
  );
}

export default CoffeeDetailButtons;
