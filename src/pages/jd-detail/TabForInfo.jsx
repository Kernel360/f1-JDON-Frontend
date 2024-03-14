import { Box, Chip, Stack, Typography } from '@mui/material';
import NewBtn from 'components/common/new-btn/NewBtn';

function JdInfoForm({ title, mockData }) {
  return (
    <Box paddingY={1}>
      <Typography color="#545459" fontSize="14px" fontWeight="700">
        {title}
      </Typography>
      <Typography variant="body3" component="div" color="#9A9AA1" fontSize={14}>
        {mockData?.split('\n').map((line, index) => (
          <p key={index}>
            {line}
            <br />
          </p>
        ))}
      </Typography>
    </Box>
  );
}

export function TabForInfo({ jdData }) {
  const handleClick = () => {
    window.open(jdData.jdUrl, '_blank');
  };
  return (
    <Box>
      <Box height={300} bgcolor="#9A9AA1" borderRadius="8px">
        <img src={jdData.imageUrl} alt="imageUrl" height={300} width="100%" />
      </Box>
      <Box sx={{ paddingY: 3, borderBottom: '1px solid #EBEBEB' }}>
        <Typography variant="body3" component="p" color="#9A9AA1" fontSize={14}>
          {jdData.company}
        </Typography>
        <Typography color="#545459" fontSize="18px" fontWeight="500">
          {jdData.title}
        </Typography>
      </Box>
      <Box sx={{ marginY: '10px' }}>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {jdData.skillList?.map((item, index) => (
            <Chip
              key={index}
              label={item.keyword}
              variant="outlined"
              size="medium"
              clickable={false}
              sx={{ color: '#6482FF', borderColor: '#6482FF' }}
            />
          ))}
        </Stack>
      </Box>
      <Box sx={{ marginY: '10px', paddingBottom: '90px' }}>
        <JdInfoForm title="자격 요견" mockData={jdData.requirements} />
        <JdInfoForm title="주요 업무" mockData={jdData.mainTasks} />
        <JdInfoForm title="소개글" mockData={jdData.intro} />
        <JdInfoForm title="혜택 및 복지" mockData={jdData.benefits} />
        <JdInfoForm title="우대사항" mockData={jdData.preferredPoints} />
      </Box>
      <Box
        maxWidth="md"
        sx={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          right: 0,
          bgcolor: 'white',
          px: '16px',
          pb: '14px',
          margin: '0 auto',
        }}>
        <NewBtn title="사이트로 이동하기" onClick={handleClick} isActive={true} />
      </Box>
    </Box>
  );
}
