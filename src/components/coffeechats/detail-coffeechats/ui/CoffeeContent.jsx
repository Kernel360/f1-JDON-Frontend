const { Typography } = require('@mui/material');
const { ContentStyle } = require('../styles');

function CoffeeDetailContent({ content }) {
  return (
    <Typography sx={ContentStyle}>
      {content?.split('\n').map((line, index) => (
        <Typography key={index}>
          {line}
          <br />
        </Typography>
      ))}
    </Typography>
  );
}

export default CoffeeDetailContent;
