import { Box } from '@mui/material';
import { Filters } from './Filters';

function FiltersAndButton({ sortData, kindOfJd, onChange }) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mt={1.5} mb={0.5}>
      <Filters sortData={sortData} onChange={onChange} kindOfJd={kindOfJd} />
    </Box>
  );
}

export default FiltersAndButton;
