const { Box } = require('@mui/material');

function infoItem({ title, content }) {
  return (
    <Box
      sx={{
        pb: '5px',
        color: '#696969',
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      {`${title} : ${content}`}
    </Box>
  );
}

export default infoItem;
