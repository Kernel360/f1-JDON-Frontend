import { Box, Button, Container, Grid, Pagination, Stack } from "@mui/material";
import BottomNav from "../../components/common/BottomNav";
import CoffeeChatCard from "../../components/common/card/CoffeeChatCard";
import SearchBar from "../../components/common/search-bar/SearchBar";
import news from "../../assets/images/new.svg";
import { Filters } from "../../components/common/filters/Filters";
import { useNavigate } from "react-router-dom";

const MockData = [
  {
    coffeechatId: 1,
    nickname: "김영한10",
    job: "backend",
    title: "주니어 백엔드 개발자를 대상으로 커피챗을 엽니다.10",
    meetDate: "2024-02-06 19:30",
    createdDate: "2024-01-07 22:10",
    activeStatus: "모집중",
    currentRecruitCount: 5,
    totalRecruitCount: 10,
  },
  {
    coffeechatId: 2,
    nickname: "김영한11",
    job: "frontend",
    title: "주니어 백엔드 개발자를 대상으로 커피챗을 엽니다.11",
    meetDate: "2024-02-06 19:40",
    createdDate: "2024-01-07 22:10",
    activeStatus: "종료",
    currentRecruitCount: 5,
    totalRecruitCount: 11,
  },

  {
    coffeechatId: 3,
    nickname: "김영한20",
    job: "backend",
    title: "주니어 백엔드 개발자를 대상으로 커피챗을 엽니다.20",
    meetDate: "2024-02-06 19:50",
    createdDate: "2024-01-07 22:10",
    activeStatus: "마감",
    currentRecruitCount: 5,
    totalRecruitCount: 20,
  },
  {
    coffeechatId: 4,
    nickname: "김영한4",
    job: "frontend",
    title: "주니어 백엔드 개발자를 대상으로 커피챗을 엽니다.20",
    meetDate: "2024-02-06 19:50",
    createdDate: "2024-01-07 22:10",
    activeStatus: "모집중",
    currentRecruitCount: 5,
    totalRecruitCount: 20,
  },
  {
    coffeechatId: 5,
    nickname: "김영한5",
    job: "backend",
    title: "주니어 백엔드 개발자를 대상으로 커피챗을 엽니다.20",
    meetDate: "2024-02-06 19:50",
    createdDate: "2024-01-07 22:10",
    activeStatus: "종료",
    currentRecruitCount: 5,
    totalRecruitCount: 20,
  },
  {
    coffeechatId: 6,
    nickname: "김영한6",
    job: "frontend",
    title: "주니어 백엔드 개발자를 대상으로 커피챗을 엽니다.20",
    meetDate: "2024-02-06 19:50",
    createdDate: "2024-01-07 22:10",
    activeStatus: "마감",
    currentRecruitCount: 5,
    totalRecruitCount: 20,
  },
];

export function Coffee() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md" sx={{ pb: 10 }}>
      <SearchBar />
      <Filters />
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          disableElevation
          sx={{ mt: 3, fontWeight: 600, padding: "4px 10px", gap: 1 }}
          onClick={() => navigate("/coffeechat-open")}
        >
          커피챗 오픈
        </Button>
      </Box>
      <Grid container spacing={{ xs: 2, md: 2 }}>
        {MockData.map((item, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <CoffeeChatCard data={item}></CoffeeChatCard>
          </Grid>
        ))}
      </Grid>
      <BasicPagination />
      <BottomNav></BottomNav>
    </Container>
  );
}

export default function BasicPagination() {
  return (
    <Box
      sx={{
        width: "100%",
        py: 3,
      }}
    >
      <Stack justifyContent="center" alignItems="center">
        <Pagination
          count={10}
          variant="outlined"
          size="large"
          color="primary"
        />
      </Stack>
    </Box>
  );
}
