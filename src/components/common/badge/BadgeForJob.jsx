import { Box } from '@mui/material';

import { jobStyle } from '../card/CardStyle';

function BadgeForJobs({ data }) {
  const jobCategories = JSON.parse(localStorage.getItem('jobCategories')) || [];
  const jobNum = jobCategories?.find((jd) => jd.name === data)?.id;

  return (
    <Box color="#FF814D" style={jobStyle(jobNum)}>
      {data}
    </Box>
  );
}
export default BadgeForJobs;
