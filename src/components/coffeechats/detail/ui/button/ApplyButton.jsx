import { useEffect, useMemo } from 'react';

import { applyCoffeechat } from 'api/api';
import ActionButton from 'components/common/button/ActionButton';

import useFetchCoffeeChatDetail from '../../queryHooks/useFetchcCoffeeChatDetail';

function ApplyButton({ title, id }) {
  const { coffeeChatData, isParticipant, setIsParticipant } = useFetchCoffeeChatDetail(id);
  const isButtonDisables = useMemo(
    () => coffeeChatData?.status !== '모집중' || isParticipant,
    [coffeeChatData, isParticipant],
  );

  const applyCoffeeValue = {
    title: coffeeChatData?.title,
    content: coffeeChatData?.content,
    totalRecruitCount: coffeeChatData?.totalRecruitCount,
    meetDate: coffeeChatData?.meetDate,
    openChatUrl: coffeeChatData?.openChatUrl,
  };

  const applyButtonText = () => {
    switch (coffeeChatData?.status) {
      case '모집중':
        return title;
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
      await applyCoffeechat(id, applyCoffeeValue);
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

  useEffect(() => {
    console.log(isParticipant);
  }, [isParticipant]);

  return (
    <ActionButton
      title={isParticipant ? '신청완료' : applyButtonText()}
      onClick={applyForCoffeeChat}
      isDisable={isButtonDisables}
    />
  );
}

export default ApplyButton;
