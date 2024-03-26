import UpdateCoffeeChatForm
  from 'components/coffeechats/edit-coffeechats/ui/UpdateCoffeeChatForm';
import Header from 'components/common/header/Header';
import FormWrapper from 'components/common/wrapper/FormWrapper';
import { COFFEE_CHILD_ID } from 'constants/headerProps';
import { useParams } from 'react-router-dom';

import {
  Box,
  Container,
  CssBaseline,
} from '@mui/material';

function CoffeeUpdatePage() {
  const { id } = useParams();

  return (
    <>
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column' }}>
        <CssBaseline />
        <Header title={COFFEE_CHILD_ID.title} url={COFFEE_CHILD_ID.url + id} />
        <Box flexGrow={1} display="flex" flexDirection="column" justifyContent="center">
          <FormWrapper title="수정하실 커피챗 정보를 입력해주세요. ☕️" styles={{ mt: '30px' }}>
            <UpdateCoffeeChatForm />
          </FormWrapper>
        </Box>
      </Container>
    </>
  );
}
export default CoffeeUpdatePage;
