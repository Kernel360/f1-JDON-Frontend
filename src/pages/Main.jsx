import {
  Box,
  Chip,
  IconButton,
  Stack,
  Tab,
  TabScrollButton,
  Tabs,
} from "@mui/material";
import { SearchBar } from "../components/search-bar/SearchBar";
import { useRef, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { MainStyles } from "./PageStyles";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const HOT_SKILLS = [
  "JavaScript",
  "React",
  "Recoil",
  "Context Api",
  5,
  6666,
  7,
  8888,
  9,
  1000,
];
const MY_SKILLS = [11111, 22, 333333, 4, 555555, 66, 7777777, 88, 999, 1000];

export function Main() {
  const [value, setValue] = useState("1");
  const scrollRef = useRef(null);

  const handleTabChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const handleScroll = (direction) => {
    if (direction === "left") {
      scrollRef.current.scrollLeft -= 100; // 왼쪽으로 스크롤
    } else {
      scrollRef.current.scrollLeft += 100; // 오른쪽으로 스크롤
    }
  };

  return (
    <div>
      <SearchBar />
      <TabContext value={value}>
        <TabList onChange={handleTabChange} sx={{ padding: "20px 16px" }}>
          <Tab label="요즘 뜨는 키워드" value="1" sx={MainStyles.Tab} />
          <Tab label="내 맞춤 키워드" value="2" sx={MainStyles.Tab} />
        </TabList>

        <TabPanel value="1" sx={MainStyles.TabPanel}>
          <IconButton
            onClick={() => handleScroll("left")}
            sx={MainStyles.IconButton}
          >
            <ArrowBackIos />
          </IconButton>
          <Stack
            direction="row"
            spacing={1}
            ref={scrollRef}
            sx={MainStyles.ChipContainer}
          >
            {HOT_SKILLS.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                variant="outlined"
                sx={MainStyles.Chips}
              />
            ))}
          </Stack>
          <IconButton
            onClick={() => handleScroll("right")}
            sx={{
              opacity: 0.3,
              padding: 1,
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </TabPanel>

        <TabPanel value="2" sx={MainStyles.TabPanel}>
          <IconButton
            onClick={() => handleScroll("left")}
            sx={MainStyles.IconButton}
          >
            <ArrowBackIos />
          </IconButton>
          <Stack
            direction="row"
            spacing={1}
            ref={scrollRef}
            sx={MainStyles.ChipContainer}
          >
            {MY_SKILLS.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                variant="outlined"
                sx={MainStyles.Chips}
              />
            ))}
          </Stack>
          <IconButton
            onClick={() => handleScroll("right")}
            sx={{
              opacity: 0.3,
              padding: 1,
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </TabPanel>
      </TabContext>
    </div>
  );
}
