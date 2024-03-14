import { Container, CssBaseline } from '@mui/material';
import Header from 'components/common/Header';
import CoffeeChatInfo from './CoffeeChatInfo';
import { useEffect, useState } from 'react';
import { getCoffeeChatDetail } from 'api/api';
import { useParams } from 'react-router-dom';
import HostInfoWithViewcount from './HostInfoWithViewcount';
import CoffeeDetailButtons from './CoffeeDetailButtons';

import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/atoms';
import { COFFEE_CHILD } from 'constants/headerProps';
import Loading from 'components/common/Loading';

function CoffeeDetail() {
  const { id } = useParams();
  const [coffeeChatData, setCoffeeChatData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const loginState = useRecoilValue(isLoggedInState);
  const [isParticipant, setIsParticipant] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await getCoffeeChatDetail(id);
        setCoffeeChatData(res);
        setIsParticipant(res.isParticipant);
      } catch (error) {
        console.error('Error fetching getCoffeeChatDetail:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Header title={COFFEE_CHILD.title} url={COFFEE_CHILD.url} />
      <HostInfoWithViewcount coffeeChatData={coffeeChatData} />
      <CoffeeChatInfo
        coffeeChatData={coffeeChatData}
        canView={coffeeChatData.hostId === loginState.memberId || coffeeChatData.isParticipant}
        isParticipant={isParticipant}
      />

      <CoffeeDetailButtons
        id={id}
        host={coffeeChatData.hostId === loginState.memberId}
        isParticipant={isParticipant}
        setIsParticipant={setIsParticipant}
        coffeeChatData={coffeeChatData}
      />
    </Container>
  );
}

export default CoffeeDetail;
