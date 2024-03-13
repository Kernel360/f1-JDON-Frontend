import { Container, CssBaseline } from '@mui/material';
import Header from 'components/common/Header';
import { CategoryTab } from './CategoryTab';
import { JD_CHILD } from 'constants/headerProps';

export function JdDetail() {
  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Header title={JD_CHILD.title} url={JD_CHILD.url} />
      <CategoryTab />
    </Container>
  );
}
