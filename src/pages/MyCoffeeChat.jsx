import React, { useState, useEffect } from "react";
import { Container, Box, Button, Typography, Grid, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Header from "../components/common/Header";
import CoffeeChatCard from "../components/common/card/CoffeeChatCard";
import { getMyCoffeeChat, getSignCoffeeChat } from "../api/api";
import Pagenation from "../components/common/Pagenation";

export default function MyCoffeeChat() {
  const [value, setValue] = useState("1");
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState({});
  const [coffeeDatas, setCoffeeDatas] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setCurrentPage(1);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    console.log("dddd", currentPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        if (value == "1") {
          res = await getMyCoffeeChat(currentPage);
          setCoffeeDatas(res.content);

          console.log(`${value} 내가 오픈한커피내용`, res);
        } else if (value == "2") {
          res = await getSignCoffeeChat(currentPage);
          console.log(`${value} 내가 신청한커피내용`, res);

          setCoffeeDatas(res);
        }

        setPage(res.pageInfo || {});
        // console.log("coffeeData ch!!", res.content);
      } catch (error) {
        console.error("MyCoffeeChat 통신에러", error);
      }
    };
    fetchData();
  }, [value, currentPage]);

  console.log(`${value}coffeeData page!!`, page.totalPages);

  return (
    <div>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "95vh",
          minwidth: "100%",
          // pb: 10,
        }}
      >
        <Header title={"커피챗"} />
        <Box mt={4} sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value} sx={{ display: "flex" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label="내가 오픈한 커피챗"
                  value="1"
                  sx={{
                    flex: 1,
                    fontSize: "20px",
                    maxWidth: "none",
                  }}
                />
                <Tab
                  label="내가 신청한 커피챗"
                  value="2"
                  sx={{
                    flex: 1,
                    fontSize: "20px",
                    maxWidth: "none",
                  }}
                />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ width: "100%" }}>
              <Grid container spacing={{ xs: 2, md: 2 }}>
                {/* Item One */}
                {coffeeDatas.map((data, index) => (
                  <Grid item xs={12} sm={6} md={6} key={index}>
                    <CoffeeChatCard data={data} />
                  </Grid>
                ))}
              </Grid>
              <Box mt={4}>
                <Pagenation
                  pageCount={page?.totalPages || 2}
                  currentPage={currentPage}
                  onChange={handlePageChange}
                />
              </Box>
            </TabPanel>
            <TabPanel value="2" sx={{ width: "100%" }}>
              <Grid container spacing={{ xs: 2, md: 2 }}>
                {/* Item Two */}
                {coffeeDatas.map((data, index) => (
                  <Grid item xs={12} sm={6} md={6} key={index}>
                    <CoffeeChatCard data={data} />
                  </Grid>
                ))}
              </Grid>
              <Box mt={4}>
                <Pagenation
                  pageCount={page?.totalPages || 2}
                  currentPage={currentPage}
                  onChange={handlePageChange}
                />
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </div>
  );
}
