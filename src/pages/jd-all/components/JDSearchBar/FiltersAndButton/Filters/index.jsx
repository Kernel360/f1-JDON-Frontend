import { Box } from '@mui/material';
import { useState } from 'react';
import FilterChips from './FilterChips';
import CommonModal from 'components/common/modal/CommonModal';
import RadioOptionsGroup from './RadioOptionsGroup';
import {
  JOB_SORT,
  ORDER_SORT,
  SKILL_SORT_ALL,
  SKILL_SORT_BE,
  SKILL_SORT_FE,
} from 'constants/jdAllFilter';

export function Filters({ sortData, onChange }) {
  const [openFilter, setOpenFilter] = useState([false, false, false]);

  const handleClose = () => {
    setOpenFilter(openFilter.map(() => false));
  };

  const handleChipClick = (value) => {
    setOpenFilter(openFilter.map((val, i) => (i === value ? !val : val)));
  };

  const OrderValueToLabel =
    ORDER_SORT.find((option) => option.value === sortData.sort)?.label || sortData.sort;
  const JobValueToLabel =
    JOB_SORT.find((option) => option.value === sortData.jobCategory)?.label || sortData.jobCategory;
  const FeSkillsToLabel =
    SKILL_SORT_FE.find((option) => option.value === sortData.jobSkills)?.label ||
    sortData.jobSkills;
  const BeSkillsToLabel =
    SKILL_SORT_BE.find((option) => option.value === sortData.jobSkills)?.label ||
    sortData.jobSkills;
  const AllSkillsToLabel =
    SKILL_SORT_ALL.find((option) => option.value === sortData.jobSkills)?.label ||
    sortData.jobSkills;

  let chipsLabel, modalOptions;

  if (sortData.jobCategory === '') {
    chipsLabel = AllSkillsToLabel;
    modalOptions = SKILL_SORT_ALL;
  } else if (sortData.jobCategory === '2') {
    chipsLabel = BeSkillsToLabel;
    modalOptions = SKILL_SORT_BE;
  } else if (sortData.jobCategory === '3') {
    chipsLabel = FeSkillsToLabel;
    modalOptions = SKILL_SORT_FE;
  }

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
      <FilterChips
        label={chipsLabel}
        onClick={() => handleChipClick(2)}
        onDelete={() => handleChipClick(2)}
        selected={sortData.jobSkills}
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
      <CommonModal open={openFilter[2]} onClose={handleClose}>
        <RadioOptionsGroup
          label={chipsLabel}
          options={modalOptions}
          onChange={onChange}
          title="jobSkills"
          defaultValue={sortData.jobSkills}
          onClose={handleClose}
        />
      </CommonModal>
    </Box>
  );
}
