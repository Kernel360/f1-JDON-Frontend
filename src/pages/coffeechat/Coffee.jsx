import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import BottomNav from "../../components/common/BottomNav";
import CoffeeChatCard from "../../components/common/card/CoffeeChatCard";
import { useEffect, useState } from "react";
import { getCoffeeChat, getJobCategory } from "../../api/api";
import PaginationComponent from "../../components/common/Pagenation";
import CoffeeBanner from "./CoffeeBanner";
import FiltersAndButton from "./FiltersAndButton";
import { useRecoilState } from "recoil";
import { kindOfJdState } from "../../recoil/atoms";

export function Coffee() {
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
  const [sortData, setSortData] = useState({
    sorting: "createdDate",
    jobCategory: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [kindOfJd, setKindOfJd] = useRecoilState(kindOfJdState);

  const handlePageChange = (_, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    (async (currentPage) => {
      try {
        const data = await getCoffeeChat(
          currentPage - 1,
          coffeeData.pageInfo.pageSize || 12,
          sortData.sorting,
          sortData.jobCategory
        );
        setCoffeeData(data.data.data);
      } catch (error) {
        console.error("Error fetching getCoffeeChat:", error);
      }
    })(currentPage);
  }, [sortData.sorting, sortData.jobCategory, currentPage]);

  useEffect(() => {
    (async () => {
      try {
        const { jobGroupList } = await getJobCategory();
        setKindOfJd(jobGroupList[0].jobCategoryList);
      } catch (error) {
        console.error("Error fetching job categories:", error);
      }
    })();
  }, []);

  return (
    <Container maxWidth="md" sx={{ pt: 3, pb: 10 }}>
      <CoffeeBanner />
      <FiltersAndButton
        sortData={sortData}
        onChange={setSortData}
        kindOfJd={kindOfJd}
      />
      <Grid container spacing={{ xs: 2, md: 2 }}>
        {coffeeData?.content?.length > 0 ? (
          coffeeData.content.map((item, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <CoffeeChatCard data={item} kindOfJd={kindOfJd} />
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
        <BasicPagination
          coffeeData={coffeeData}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
      <BottomNav />
    </Container>
  );
}

export default function BasicPagination({
  coffeeData,
  currentPage,
  handlePageChange,
}) {
  return (
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
  );
}
