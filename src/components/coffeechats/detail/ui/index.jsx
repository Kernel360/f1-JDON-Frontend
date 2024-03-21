import { useRef } from 'react';

import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/atoms';

import { Divider } from '@mui/material';

import useFetchCoffeeChatDetail from '../queryHooks/useFetchcCoffeeChatDetail';
import CoffeeDetailChatLink from './CoffeeChatLink';
import CoffeeDetailContent from './CoffeeContent';
import CoffeeTitle from './CoffeeTitle';
import RecruitmentInfo from './RecruitmentInfo';

function CoffeeInfo({ isParticipant }) {
  const { id } = useParams();
  const inputRef = useRef(null);
  const loginState = useRecoilValue(isLoggedInState);
  const { coffeeChatData } = useFetchCoffeeChatDetail(id);
  const canView = coffeeChatData?.hostId === loginState.memberId || coffeeChatData?.isParticipant;
  const hasAuthenticate = canView || isParticipant;

  return (
    <>
      <CoffeeTitle title={coffeeChatData?.title} />
      <RecruitmentInfo coffeeChatData={coffeeChatData} />
      <Divider />
      <CoffeeDetailContent content={coffeeChatData?.content} />
      <CoffeeDetailChatLink
        hasAuthenticate={hasAuthenticate}
        openChatUrl={coffeeChatData?.openChatUrl}
        inputRef={inputRef}
      />
    </>
  );
}

export default CoffeeInfo;
