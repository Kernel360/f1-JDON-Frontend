export const SearchTextFiled = () => ({
  background: '#F5F5F7',
  borderRadius: '10px',
  margin: '12px auto',
  '& .MuiOutlinedInput-root': {
    margin: '2px 0',
    '& fieldset': {
      border: 'none',
      borderRadius: '10px', // 기본 테두리 두께
    },
  },
});

export const SearchContainer = () => ({
  padding: '0 !important',
  '& .MuiInputBase-input': {
    padding: '12px',
  },
});
