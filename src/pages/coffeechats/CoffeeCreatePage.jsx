import {
  useEffect,
  useState,
} from 'react';

import { getMemberInfo } from 'api/api';
import CreateCoffeeChatForm
  from 'components/coffeechats/create-coffeechats/ui/CreateCoffeeChatForm';
import UserInfo from 'components/coffeechats/list-coffeechats/ui/UserInfo';
import Header from 'components/common/header/Header';
import FormWrapper from 'components/common/wrapper/FormWrapper';
import { COFFEE_CHILD } from 'constants/headerProps';

import {
  Box,
  Container,
  CssBaseline,
} from '@mui/material';

function CoffeeCreatePage() {
  const [nickname, setNickName] = useState('');
  const [jobId, setJobId] = useState(0);

  useEffect(() => {
    const memData = async () => {
      const res = await getMemberInfo();
      setNickName(res.data.nickname);
      setJobId(res.data.jobCategoryId);
    };
    memData();
  }, []);

  return (
    <Container maxWidth="sm" display="flex" flexDirection="column">
      <CssBaseline />
      <Header title={COFFEE_CHILD.title} url={COFFEE_CHILD.url} />
      <Box flexGrow={1} display="flex" flexDirection="column" justifyContent="center">
        <FormWrapper title="커피챗 정보를 입력해주세요. ☕️">
          <UserInfo nickname={nickname} jobId={jobId} />
          <CreateCoffeeChatForm />
        </FormWrapper>
      </Box>
    </Container>
  );
}
export default CoffeeCreatePage;
