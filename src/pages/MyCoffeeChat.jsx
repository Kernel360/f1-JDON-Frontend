import React, { useState, useEffect } from "react";
import { Container, Box, Button, Typography, Grid, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Header from "../components/common/Header";
import CoffeeChatCard from "../components/common/card/CoffeeChatCard";
import { getMyCoffeeChat } from "../api/api";

export default function MyCoffeeChat() {
  const [value, setValue] = useState("1");
  const [currentPage, setCurrentPAge] = useState(1);
  const [data, setData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyCoffeeChat(currentPage);
        setData(res);
        console.log("data ch!!", data);
      } catch (error) {
        console.error("MyCoffeeChat 통신에러", error);
      }
    };
    fetchData();
  }, []);

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

        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value} sx={{ display: "flex" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label="내가 오픈한 커피챗"
                  value="1"
                  sx={{ flex: 1, fontSize: "20px" }}
                />
                <Tab
                  label="내가 신청한 커피챗"
                  value="2"
                  sx={{ flex: 1, fontSize: "20px" }}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Box>
                Item One
                {/* <CoffeeChatCard /> */}
              </Box>
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
          </TabContext>
        </Box>
      </Container>
    </div>
  );
}
