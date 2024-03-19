import { useEffect, useState } from 'react';

const { NativeSelect } = require('@mui/material');

function SelectOption({ searchOptions, useCompanyName = false }) {
  useEffect(() => {
    localStorage.setItem('searchOption', 'title');
  }, []);

  const [menuTitle, setMenuTitle] = useState(searchOptions);

  const selectionChangeHandler = (event) => {
    const selectedValue = event.target.value;
    setMenuTitle(selectedValue);

    if (useCompanyName && selectedValue === '1') {
      localStorage.setItem('searchOption', 'title');
    }
    if (useCompanyName && selectedValue === '2') {
      localStorage.setItem('searchOption', 'company');
    }
  };

  return (
    <NativeSelect
      disableUnderline
      defaultValue={menuTitle}
      value={menuTitle}
      onChange={selectionChangeHandler}
      sx={{
        color: 'rgba(0, 0, 0, 0.54);',
        width: '120px',
        fontSize: '14px',
        '& .MuiInputBase-input': {
          paddingX: '10px',
        },
      }}>
      <option value={1} style={{ color: 'rgba(0, 0, 0, 0.54);' }}>
        {searchOptions}
      </option>
      {useCompanyName ? (
        <option value={2} style={{ color: 'rgba(0, 0, 0, 0.54);' }}>
          {'회사명'}
        </option>
      ) : (
        ''
      )}
    </NativeSelect>
  );
}

export default SelectOption;
