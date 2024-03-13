import { Chip } from '@mui/material';
import Arrow from 'assets/icons/chip_arrow.svg';

function FilterChips({ label, onClick, onDelete, selected }) {
  return (
    <Chip
      label={label}
      clickable
      variant="outlined"
      onClick={onClick}
      onDelete={onDelete}
      sx={{
        display: 'flex',
        color: selected ? '#6482FF' : '#6E6E71',
        background: selected && '#E2E7FF',
        borderColor: selected && '#6482FF',
        fontWeight: selected && 700,
      }}
      deleteIcon={<img src={Arrow} alt="드롭다운" />}
    />
  );
}

export default FilterChips;
