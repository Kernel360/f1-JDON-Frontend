import { Box, Button, Grid } from '@mui/material';

import ShareIcon from '@mui/icons-material/Share';
import NewBtn from 'components/common/new-btn/NewBtn';
import { theme } from 'styles/themeMuiStyle';
import { useNavigate } from 'react-router-dom';
import { applyCoffeechat, deleteCoffeechat } from 'api/api';
import { useEffect, useState } from 'react';
import { buttonStyles } from '../ButtonStyle';

function CoffeeDetailButtons({ id, host, coffeeChatData, isParticipant, setIsParticipant }) {
  const navigate = useNavigate();
  const [applyCoffee, setApplyCoffee] = useState({});
  const isButtonDisables = coffeeChatData.status !== '모집중' || isParticipant;

  const applyButtonText = () => {
    switch (coffeeChatData.status) {
      case '모집중':
        return '신청하기';
      case '모집종료':
        return '모집 마감';
      case '모집완료':
        return '종료된 커피챗입니다.';
      default:
        return '상태 확인 중';
    }
  };

  const applyForCoffeeChat = async () => {
    try {
      await applyCoffeechat(id, applyCoffee);
      alert('신청이 완료되었습니다.');
      setIsParticipant(true);
    } catch (error) {
      if (error.response?.status !== 409) {
        console.error('신청 중 에러가 발생했습니다.');
        return;
      }
      alert('이미 신청된 커피챗입니다.');
      return;
    }
  };

  const editCoffeeChat = async () => {
    navigate(`/edit-coffee/${id}`);
  };

  const removeCoffeeChat = async () => {
    let confirmation = true; // 기본적으로 삭제를 진행

    // 현재 모집 인원이 1명 이상인 경우에만 확인 창을 표시
    if (coffeeChatData.currentRecruitCount > 0) {
      confirmation = window.confirm(
        '삭제하려는 커피챗에 참여 신청한 회원이 존재합니다. \n 정말 삭제하시겠습니까?',
      );
    }

    if (confirmation) {
      try {
        await deleteCoffeechat(id, applyCoffee);
        alert('삭제가 완료되었습니다.');
        navigate('/coffee');
      } catch (error) {
        console.error('삭제 중 오류가 발생했습니다. : ', error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      setApplyCoffee({
        title: coffeeChatData.title,
        content: coffeeChatData.content,
        totalRecruitCount: coffeeChatData.totalRecruitCount,
        meetDate: coffeeChatData.meetDate,
        openChatUrl: coffeeChatData.openChatUrl,
      });
    })();
  }, [id, coffeeChatData]);

  const copyUrlToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert('URL이 클립보드에 복사되었습니다.');
      })
      .catch((err) => {
        console.error('URL 복사에 실패했습니다.', err);
      });
  };

  return (
    <Box sx={buttonStyles.Container}>
      <Box
        container
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '20px',
        }}>
        <Grid item xs={8} sm={8} fullwidth sx={{ display: 'flex', gap: '12px', flexGrow: 1 }}>
          {host ? (
            <>
              <NewBtn
                title="수정하기"
                styles={{
                  background: theme.palette.primary.main,
                  color: 'white',
                }}
                onClick={editCoffeeChat}
              />
              <NewBtn
                title="삭제하기"
                styles={{
                  background: theme.palette.primary.main,
                  color: 'white',
                }}
                onClick={removeCoffeeChat}
              />
            </>
          ) : (
            <NewBtn
              title={isParticipant ? '신청완료' : applyButtonText()}
              styles={{
                background: isButtonDisables ? '#EBEBEB' : theme.palette.primary.main,
                color: 'white',
              }}
              onClick={applyForCoffeeChat}
              disable={isButtonDisables}
            />
          )}
        </Grid>
        <Box item>
          <Button sx={buttonStyles.ShareButton} onClick={copyUrlToClipboard}>
            <ShareIcon sx={{ color: theme.palette.primary.main }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CoffeeDetailButtons;
