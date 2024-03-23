import { useMemo } from 'react';

import ActionButton from 'components/common/button/ActionButton';

import useApplyForCoffeeChat from '../../queryHooks/useApplyForCoffeeChat';

function ApplyButton({ title, id, coffeeChatData }) {
  const isParticipant = coffeeChatData?.isParticipant;
  const isButtonDisables = useMemo(
    () => coffeeChatData?.status !== '모집중' || isParticipant,
    [coffeeChatData, isParticipant],
  );
  const { apply } = useApplyForCoffeeChat(id);

  const applyForCoffeeChat = () => {
    apply(id, applyCoffeeValue);
  };
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

  return (
    <ActionButton
      title={isParticipant ? '신청완료' : applyButtonText()}
      onClick={applyForCoffeeChat}
      isDisable={isButtonDisables}
    />
  );
}

export default ApplyButton;
