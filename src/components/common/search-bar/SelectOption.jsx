import { useState } from 'react';

const { NativeSelect } = require('@mui/material');

function SelectOption({ searchOptions }) {
  const [menuTitle, setMenuTitle] = useState(searchOptions[0]);

  const selectionChangeHandler = (event) => {
    setMenuTitle(event.target.value);
  };

  return (
    <NativeSelect
      disableUnderline
      defaultValue={menuTitle}
      value={menuTitle}
      onChange={selectionChangeHandler}
      sx={{
        color: 'rgba(0, 0, 0, 0.54);',
        width: '90px',
        fontSize: '14px',
        '& .MuiInputBase-input': {
          paddingX: '10px',
        },
      }}>
      <option value={1} style={{ color: 'rgba(0, 0, 0, 0.54);' }}>
        {searchOptions[0]}
      </option>
    </NativeSelect>
  );
}

export default SelectOption;
