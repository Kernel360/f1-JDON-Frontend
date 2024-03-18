import { Box } from '@mui/material';
import { useState } from 'react';
import FilterChips from './FilterChips';
import CommonModal from 'components/common/modal/CommonModal';
import RadioOptionsGroup from './RadioOptionsGroup';
import { JOB_SORT, ORDER_SORT } from 'constants/jdAllFilter';

export function Filters({ sortData, onChange }) {
  const [openFilter, setOpenFilter] = useState([false, false]);

  const handleClose = () => {
    setOpenFilter(openFilter.map(() => false))
  };

  const handleChipClick = (value) => {
    setOpenFilter(openFilter.map((val, i) => (i === value ? !val : val)));
  };

  const OrderValueToLabel =
    ORDER_SORT.find((option) => option.value === sortData.sort)?.label || sortData.sort;
  const JobValueToLabel =
    JOB_SORT.find((option) => option.value === sortData.jobCategory)?.label || sortData.jobCategory;

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <FilterChips
        label={OrderValueToLabel}
        onClick={() => handleChipClick(0)}
        onDelete={() => handleChipClick(0)}
        selected={sortData.sort !== ORDER_SORT[0].value}
      />
      <FilterChips
        label={JobValueToLabel}
        onClick={() => handleChipClick(1)}
        onDelete={() => handleChipClick(1)}
        selected={sortData.jobCategory}
      />

      <CommonModal open={openFilter[0]} onClose={handleClose}>
        <RadioOptionsGroup
          label={OrderValueToLabel}
          options={ORDER_SORT}
          onChange={onChange}
          title="sort"
          defaultValue={sortData.sort}
          onClose={handleClose}
        />
      </CommonModal>
      <CommonModal open={openFilter[1]} onClose={handleClose}>
        <RadioOptionsGroup
          label={JobValueToLabel}
          options={JOB_SORT}
          onChange={onChange}
          title="jobCategory"
          defaultValue={sortData.jobCategory}
          onClose={handleClose}
        />
      </CommonModal>
    </Box>
  );
}
