import { Box, Button, Container, Grid, Pagination, Stack } from "@mui/material";
import BottomNav from "../../components/common/BottomNav";
import CoffeeChatCard from "../../components/common/card/CoffeeChatCard";
import SearchBar from "../../components/common/search-bar/SearchBar";
import { Filters } from "../../components/common/filters/Filters";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCoffeeChat } from "../../api/api";

export function Coffee() {
  const navigate = useNavigate();
  const [coffeeData, setCoffeeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCoffeeChat(1);
        setCoffeeData((prev) => [...prev, ...data]);
      } catch (error) {
        console.error("Error fetching hot skills:", error);
      }
    };
    fetchData();
  }, []);
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
