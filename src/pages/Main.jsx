import { Box, Chip, Stack, Tab, Tabs } from "@mui/material";
import { SearchBar } from "../components/search-bar/SearchBar";
import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { MainStyles } from "./PageStyles";

const HOT_SKILLS = [1, 2222, 3, 4444, 5, 6666, 7, 8888, 9, 1000];
const MY_SKILLS = [11111, 22, 333333, 4, 555555, 66, 7777777, 88, 999, 1000];

export function Main() {
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <div>
      <SearchBar></SearchBar>
      <TabContext value={value}>
        <TabList onChange={handleTabChange} aria-label="lab API tabs example">
          <Tab label="요즘 뜨는 키워드" value="1" sx={{ fontSize: 16 }} />
          <Tab label="내 맞춤 키워드" value="2" sx={{ fontSize: 16 }} />
        </TabList>
        <TabPanel value="1">
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {HOT_SKILLS.map((chip, i) => (
              <Chip
                key={i}
                label={chip}
                clickable={true}
                sx={MainStyles.Chips}
                variant="outlined"
                size="medium"
              />
            ))}
          </Stack>
        </TabPanel>
        <TabPanel value="2">
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {MY_SKILLS.map((chip, i) => (
              <Chip
                key={i}
                label={chip}
                clickable={true}
                sx={MainStyles.Chips}
                variant="outlined"
                size="medium"
              />
            ))}
          </Stack>
        </TabPanel>
      </TabContext>
    </div>
  );
}
