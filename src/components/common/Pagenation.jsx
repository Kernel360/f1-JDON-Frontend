import { Container } from '@mui/material';
import Pagination from '@mui/material/Pagination';

export default function PaginationComponent({ pageCount, currentPage, onChange }) {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: '1.25rem',
      }}>
      <Pagination
        count={pageCount} // 전체 페이지 수
        page={currentPage} // 현재 페이지
        onChange={onChange}
        variant="outlined"
        color="primary"
      />
    </Container>
  );
}
