import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import BottomNav from "../../components/common/BottomNav";
import CoffeeChatCard from "../../components/common/card/CoffeeChatCard";
import { Filters } from "../../components/common/filters/Filters";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCoffeeChat, getJobCategory } from "../../api/api";
import PaginationComponent from "../../components/common/Pagenation";

export function Coffee() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(localStorage.getItem("isLoggedInState"));
  const [coffeeData, setCoffeeData] = useState({
    content: [],
    pageInfo: {
      totalPages: 0,
      pageSize: 12,
      first: true,
      last: false,
      empty: true,
    },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortData, setSortData] = useState({
    sorting: "createdDate",
    jobCategory: "",
  });

  const [kindOfJd, setKindOfJd] = useState();

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleConfirm = () => {
    if (
      window.confirm(
        "[커피챗 오픈]은 로그인 후에 확인 하실 수 있습니다. 로그인페이지로 이동하시겠습니까?"
      )
    ) {
      navigate("/signin");
    }
  };

  const handleOpenCoffee = (event, newPage) => {
    console.log(login);
    if (login === "false") {
      handleConfirm();
      return;
    } else {
      navigate("/coffeechat-open");
    }
  };

  useEffect(() => {
    const fetchData = async (page) => {
      try {
        const data = await getCoffeeChat(
          page - 1,
          coffeeData.pageInfo.pageSize || 12,
          sortData.sorting,
          sortData.jobCategory
        );
        setCoffeeData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching hot skills:", error);
      }
    };
    fetchData(currentPage);
  }, [sortData.sorting, sortData.jobCategory, currentPage]);

  // 직무 카테고리 데이터 불러오기 - 컴포넌트가 마운트될 때만 실행
  useEffect(() => {
    const fetchJobCategory = async () => {
      try {
        const { jobGroupList } = await getJobCategory();
        setKindOfJd(jobGroupList[0].jobCategoryList);
      } catch (error) {
        console.error("Error fetching job categories:", error);
      }
    };
    fetchJobCategory();
  }, []);

  return (
    <Container maxWidth="md" sx={{ pt: 3, pb: 10 }}>
      <Box
        sx={{
          background: "#F5F2F2",
          borderRadius: "10px",
          py: 3.5,
          mb: 3,
          position: "relative",
        }}
      >
        <Typography
          sx={{
            ml: 3,
            color: "#30190B",
            fontSize: "14px",
            fontWeight: 400,
            letterSpacing: 2,
          }}
        >
          {" "}
          <span style={{ fontSize: "16px" }}>💡 </span>관심분야의 커피챗을
          신청해보세요!
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={0.5}
      >
        <Filters
          sortData={sortData}
          onChange={setSortData}
          kindOfJd={kindOfJd}
        />
        <Button
          variant="contained"
          disableElevation
          sx={{
            fontWeight: 600,
            fontSize: 12,
            padding: "4px 10px",
            gap: 1,
          }}
          onClick={handleOpenCoffee}
        >
          + New
        </Button>
      </Box>
      <Grid container spacing={{ xs: 2, md: 2 }}>
        {coffeeData?.content?.length > 0 ? (
          coffeeData.content.map((item, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <CoffeeChatCard data={item}></CoffeeChatCard>
            </Grid>
          ))
        ) : (
          <Typography
            sx={{
              ml: 2,
              mt: 8,
              width: "100%",
              textAlign: "center",
              fontSize: "16px",
              color: "#B9B9B9",
              fontWeight: 600,
            }}
          >
            커피챗 정보가 없습니다.
          </Typography>
        )}
      </Grid>
      {coffeeData?.content?.length > 0 && (
        <Box
          sx={{
            width: "100%",
            py: 3,
          }}
        >
          <Stack justifyContent="center" alignItems="center">
            <PaginationComponent
              pageCount={coffeeData?.pageInfo.totalPages}
              currentPage={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </Box>
      )}
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
        <PaginationComponent />
      </Stack>
    </Box>
  );
}
