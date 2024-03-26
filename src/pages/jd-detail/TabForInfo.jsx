import NewBtn from 'components/common/button/NewBtn';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { BackgroundImg, MainImg, RelativeBox } from './style';
import ContentSkeleton from 'components/common/loading/skeleton/jd-detail/content';
import TitleSkeleton from 'components/common/loading/skeleton/jd-detail/title';
import ImgSkeleton from 'components/common/loading/skeleton/jd-detail/img';

function JdInfoForm({ title, mockData }) {
  return (
    <Box paddingY={1}>
      <Typography color="black" fontSize="18px" fontWeight="800">
        {title}
      </Typography>
      <Typography variant="body3" component="div" color="#545459" fontSize="16px">
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

  const formatDate = (dateData) => {
    if (dateData === '') {
      const formattedDate = '상시채용';
      return formattedDate;
    }
    const date = new Date(dateData);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}년 ${month}월 ${day}일까지`;
    return formattedDate;
  };

  return (
    <Box>
      <Box height={330} borderRadius="8px" sx={RelativeBox}>
        {jdData.id ? (
          <>
            <img src={jdData.imageUrl} alt="imageUrl" height={500} style={BackgroundImg} />
            <img src={jdData.imageUrl} alt="imageUrl" height={300} style={MainImg} />
          </>
        ) : (
          <ImgSkeleton />
        )}
      </Box>
      <Box sx={{ paddingY: 3, borderBottom: '1px solid #EBEBEB' }}>
        {jdData.id ? (
          <>
            <Typography variant="body3" component="p" color="#9A9AA1" fontSize={14}>
              {jdData.company}
            </Typography>
            <Typography color="#545459" fontSize="18px" fontWeight="500">
              {jdData.title}
            </Typography>
          </>
        ) : (
          <TitleSkeleton />
        )}
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
        {jdData.id ? (
          <>
            <JdInfoForm title="마감 일자" mockData={formatDate(jdData.deadlineDate)} />
            <JdInfoForm title="자격 요견" mockData={jdData.requirements} />
            <JdInfoForm title="주요 업무" mockData={jdData.mainTasks} />
            <JdInfoForm title="소개글" mockData={jdData.intro} />
            <JdInfoForm title="혜택 및 복지" mockData={jdData.benefits} />
            <JdInfoForm title="우대사항" mockData={jdData.preferredPoints} />
          </>
        ) : (
          <ContentSkeleton />
        )}
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
