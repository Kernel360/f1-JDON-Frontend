import { useRef } from 'react';

import useClipboardCopy from 'components/coffeechats/Detail/queryHooks/useClipboardCopy';

import { Divider } from '@mui/material';

import CoffeeDetailChatLink from './CoffeeChatLink';
import CoffeeDetailContent from './CoffeeContent';
import CoffeeTitle from './CoffeeTitle';
import RecruitmentInfo from './RecruitmentInfo';

function CoffeeInfo({ coffeeChatData, canView, isParticipant }) {
  const [isCopied, copyToClipboard] = useClipboardCopy(coffeeChatData.openChatUrl);
  const inputRef = useRef(null);
  const hasAuthenticate = canView || isParticipant;

  return (
    <>
      <CoffeeTitle title={coffeeChatData.title} />
      <RecruitmentInfo coffeeChatData={coffeeChatData} />
      <Divider />
      <CoffeeDetailContent content={coffeeChatData.content} />
      <CoffeeDetailChatLink
        hasAuthenticate={hasAuthenticate}
        openChatUrl={coffeeChatData.openChatUrl}
        isCopied={isCopied}
        onCopy={copyToClipboard}
        inputRef={inputRef}
      />
    </>
  );
}

export default CoffeeInfo;
