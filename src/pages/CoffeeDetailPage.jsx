import useFetchCoffeeChatDetail
  from 'components/coffeechats/detail-coffeechats/queryHooks/useFetchcCoffeeChatDetail';
import CoffeeChatDetails from 'components/coffeechats/detail-coffeechats/ui';
import CoffeeDetailButtons
  from 'components/coffeechats/detail-coffeechats/ui/CoffeeDetailButtons';
import DynamicHeader
  from 'components/coffeechats/detail-coffeechats/ui/DynamicHeader';
import HostInfoWithViewcount
  from 'components/coffeechats/detail-coffeechats/ui/HostInfoWithViewcount';
import Loading from 'components/common/loading/Loading';
import { useParams } from 'react-router-dom';

import {
  Container,
  CssBaseline,
} from '@mui/material';

function CoffeeDetailPage() {
  const { id } = useParams();
  const { coffeeChatData, isLoading } = useFetchCoffeeChatDetail(id);

  const backPath = localStorage.getItem('back_path');

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <DynamicHeader backPath={backPath} />
      <HostInfoWithViewcount coffeeChatData={coffeeChatData} />
      <CoffeeChatDetails coffeeChatData={coffeeChatData} />
      <CoffeeDetailButtons coffeeChatId={id} coffeeChatData={coffeeChatData} />
    </Container>
  );
}

export default CoffeeDetailPage;
