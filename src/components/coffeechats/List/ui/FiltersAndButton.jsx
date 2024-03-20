import { Filters } from 'components/common/Filters';

import { Box } from '@mui/material';

import CreateCoffeeChatButton from './CreateCoffeeChatButton';

function FiltersAndButton({ sortData, kindOfJd, onChange }) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mt={1.5} mb={0.5}>
      <Filters sortData={sortData} onChange={onChange} kindOfJd={kindOfJd} />
      <CreateCoffeeChatButton />
    </Box>
  );
}

export default FiltersAndButton;
