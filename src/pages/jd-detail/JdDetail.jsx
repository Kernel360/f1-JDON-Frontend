import { Container, CssBaseline } from '@mui/material';
import Header from 'components/common/header/Header';
import { CategoryTab } from './CategoryTab';
import { JD_CHILD } from 'constants/headerProps';
import { useEffect } from 'react';
import { useAuth } from 'pages/mainpage/hooks/useAuth';

export function JdDetail() {

  useEffect(() => {
    useAuth;
  }, []);

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Header title={JD_CHILD.title} url={JD_CHILD.url} />
      <CategoryTab />
    </Container>
  );
}
