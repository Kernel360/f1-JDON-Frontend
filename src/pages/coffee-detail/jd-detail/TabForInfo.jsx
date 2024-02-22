import { Box, Button, Typography } from "@mui/material";
import NewBtn from "../../../components/common/new-btn/NewBtn";

function JdInfoForm({ title, mockData }) {
  return (
    <Box paddingY={1}>
      <Typography color="#545459" fontSize="14px" fontWeight="700">
        {title}
      </Typography>
      <Typography variant="body3" component="p" color="#9A9AA1" fontSize={14}>
        {mockData}
      </Typography>
    </Box>
  );
}

export function TabForInfo({ mockData }) {
  const handleClick = () => {
    window.open(mockData.jdUrl, "_blank");
  };
  return (
    <Box>
      <Box height={300} bgcolor="#9A9AA1" borderRadius="8px"></Box>
      {/* //imageUrl */}
      <Box sx={{ paddingY: 3, borderBottom: "1px solid #EBEBEB" }}>
        <Typography variant="body3" component="p" color="#9A9AA1" fontSize={14}>
          {mockData.company}
        </Typography>
        <Typography color="#545459" fontSize="18px" fontWeight="500">
          {mockData.title}
        </Typography>
      </Box>
      <Box sx={{ marginY: "10px" }}>
        <JdInfoForm title="자격 요견" mockData={mockData.requirements} />
        <JdInfoForm title="주요 업무" mockData={mockData.mainTasks} />
        <JdInfoForm title="소개글" mockData={mockData.intro} />
        <JdInfoForm title="혜택 및 복지" mockData={mockData.benefits} />
        <JdInfoForm title="우대사항" mockData={mockData.preferredPoints} />
      </Box>
      <NewBtn title="사이트로 이동하기" onClick={handleClick} isActive={true} />
    </Box>
  );
}
