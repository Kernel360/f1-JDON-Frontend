import { useEffect, useState } from 'react';

import { getCoffeeChatDetail } from 'api/api';
import CoffeeInfo from 'components/coffeechats/Detail/ui';
import CoffeeDetailButtons from 'components/coffeechats/Detail/ui/CoffeeDetailButtons';
import HostInfoWithViewcount from 'components/coffeechats/Detail/ui/HostInfoWithViewcount';
import Header from 'components/common/header/Header';
import Loading from 'components/common/loading/Loading';
import { COFFEE_CHILD, COFFEE_MYPAGE_CHILD } from 'constants/headerProps';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/atoms';

import { Container, CssBaseline } from '@mui/material';

function CoffeeDetailPage() {
  const { id } = useParams();
  const [coffeeChatData, setCoffeeChatData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const loginState = useRecoilValue(isLoggedInState);
  const [isParticipant, setIsParticipant] = useState(false);

  const backPath = localStorage.getItem('back_path');

  useEffect(() => {
    return () => {
      // localStorage.removeItem('back_path');
    };
  }, []);

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
      {backPath === '/mypage/coffee' ? (
        <Header title={COFFEE_MYPAGE_CHILD.title} url={COFFEE_MYPAGE_CHILD.url} />
      ) : (
        <Header title={COFFEE_CHILD.title} url={COFFEE_CHILD.url} />
      )}
      <HostInfoWithViewcount coffeeChatData={coffeeChatData} />
      <CoffeeInfo
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

export default CoffeeDetailPage;
