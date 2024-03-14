import { Container } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useEffect } from 'react';

export default function PaginationComponent({ pageCount, currentPage, onChange }) {
  useEffect(() => {
    localStorage.setItem('page', JSON.stringify(currentPage));
  }, [currentPage]);

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: '1.25rem',
      }}>
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={onChange}
        variant="outlined"
        color="primary"
      />
    </Container>
  );
}
