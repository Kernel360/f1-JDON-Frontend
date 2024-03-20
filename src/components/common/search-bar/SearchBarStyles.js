export const SearchTextFiled = () => ({
  position: 'relative',
  background: '#F5F5F7',
  borderRadius: '10px',
  height: '52px',
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
  zIndex: 'auto',
  position: 'relative',
  padding: '0 !important',
  '& .MuiInputBase-input': {
    padding: '12px',
  },
});

export const SearchResetBtn = () => ({
  position: 'absolute',
  left: '0',
  bottom: '-10%',

  color: '#f84d4d',

  fontWeight: '300',
});
