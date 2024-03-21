import useFetchCoffeeChatDetail from 'components/coffeechats/Detail/queryHooks/useFetchcCoffeeChatDetail';
import CoffeeInfo from 'components/coffeechats/Detail/ui';
import CoffeeDetailButtons from 'components/coffeechats/Detail/ui/CoffeeDetailButtons';
import HostInfoWithViewcount from 'components/coffeechats/Detail/ui/HostInfoWithViewcount';
import Loading from 'components/common/loading/Loading';
import Header from 'components/layout/Header';
import { COFFEE_CHILD, COFFEE_MYPAGE_CHILD } from 'constants/headerProps';
import { useParams } from 'react-router-dom';

import { Container, CssBaseline } from '@mui/material';

function CoffeeDetailPage() {
  const { id } = useParams();

  const backPath = localStorage.getItem('back_path');

  function getHeaderComponent(backPath) {
    if (backPath === '/mypage/coffee') {
      return <Header title={COFFEE_MYPAGE_CHILD.title} url={COFFEE_MYPAGE_CHILD.url} />;
    } else {
      return <Header title={COFFEE_CHILD.title} url={COFFEE_CHILD.url} />;
    }
  }

  const { isLoading } = useFetchCoffeeChatDetail(id);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Container maxWidth="md">
      <CssBaseline />
      {getHeaderComponent(backPath)}
      <HostInfoWithViewcount id={id} />
      <CoffeeInfo />
      <CoffeeDetailButtons id={id} />
    </Container>
  );
}

export default CoffeeDetailPage;
