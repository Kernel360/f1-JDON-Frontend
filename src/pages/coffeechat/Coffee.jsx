import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import BottomNav from "../../components/common/BottomNav";
import CoffeeChatCard from "../../components/common/card/CoffeeChatCard";
import { Filters } from "../../components/common/filters/Filters";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCoffeeChat, getJobCategory, getSkillsOnJD } from "../../api/api";
import PaginationComponent from "../../components/common/Pagenation";

export function Coffee() {
  const navigate = useNavigate();
  const [coffeeData, setCoffeeData] = useState([]);
  const [sorting, setSorting] = useState("createdDate,desc");
  const [kindOfJd, setKindOfJd] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCoffeeChat(1, sorting);
        setCoffeeData(data);
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
      } catch (error) {
        console.error("Error fetching hot skills:", error);
      }
    };
    console.log(sorting);
    fetchData();
    fetchJobCategory();
  }, []);
  return (
    <Container maxWidth="md" sx={{ pt: 3, pb: 10 }}>
      <Box
        sx={{
          bgcolor: "black",
          borderRadius: "10px",
          py: 6,
          mb: 3,
        }}
      >
        <Typography sx={{ ml: 2, color: "white", fontSize: "14px" }}>
          {" "}
          관심분야에서 커피챗을 이용해보세요
        </Typography>
      </Box>
      {/* <Filters sorting={sorting} onChange={setSorting} kindOfJd={kindOfJd} /> */}
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          disableElevation
          sx={{
            mt: 3,
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
        {coffeeData.map((item, index) => (
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
        <PaginationComponent />
      </Stack>
    </Box>
  );
}
