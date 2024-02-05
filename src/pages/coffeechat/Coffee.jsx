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
  const [coffeeData, setCoffeeData] = useState({
    content: [],
    pageInfo: {},
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortData, setSortData] = useState({
    sorting: "createdDate",
    jobCategory: "",
  });

  const [kindOfJd, setKindOfJd] = useState();

  const handlePageChange = (event, newPage) => {
    // if (coffeeData.pageInfo.last === true) {
    //   console.log(coffeeData.pageInfo.last);
    //   alert("마지막 페이지입니다.");
    // } else {
    setCurrentPage(newPage);
    console.log(newPage);
    fetchData(newPage, coffeeData.pageInfo.pageSize);
  };

  const fetchData = async (page, size) => {
    try {
      const data = await getCoffeeChat(
        page - 1,
        size,
        sortData.sorting,
        sortData.jobCategory
      );
      setCoffeeData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching hot skills:", error);
    }
  };

  const fetchJobCategory = async () => {
    try {
      const data = await getJobCategory();
      console.log(data.jobGroupList[0].jobCategoryList);
      const kindOfJd = data.jobGroupList[0].jobCategoryList;
      setKindOfJd(kindOfJd);
      console.log(kindOfJd);
    } catch (error) {
      console.error("Error fetching hot skills:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, coffeeData?.pageInfo.pageSize);
  }, [sortData.sorting, sortData.jobCategory, currentPage]);
  //console.log(coffeeData?.pageInfo.pageSize || 12);

  useEffect(() => {
    fetchData(currentPage, coffeeData.pageInfo.pageSize);
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
            fontWeight: 500,
            padding: "4px 10px",
            gap: 1,
          }}
          onClick={() => navigate("/coffeechat-open")}
        >
          커피챗 오픈
        </Button>
      </Box>
      <Grid container spacing={{ xs: 2, md: 2 }}>
        {coffeeData?.content?.length > 0
          ? coffeeData.content.map((item, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <CoffeeChatCard data={item}></CoffeeChatCard>
              </Grid>
            ))
          : coffeeData.pageInfo.totalPage < 1 && (
              <Typography
                sx={{ ml: 2, mt: 7, width: "100%", textAlign: "center" }}
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
