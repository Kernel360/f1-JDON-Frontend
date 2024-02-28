import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { TabForInfo } from "./TabForInfo";
import { TabForReview } from "./TabForReview";
import { MainStyles } from "../PageStyles";
import { getJdDetail } from "../../api/api";
import { useParams } from "react-router-dom";

function TabPanelItem({ children, value }) {
  return (
    <TabPanel
      value={value}
      sx={{
        ...MainStyles.TabPanel,
        flexGrow: 1,
        "&.MuiTabPanel-root": {
          paddingX: 0,
        },
      }}
    >
      {children}
    </TabPanel>
  );
}

export function CategoryTab() {
  const [value, setValue] = useState("1");
  const [jdData, setJdData] = useState({});

  const { id } = useParams();

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    (async () => {
      const res = await getJdDetail(id);
      setJdData(res);
    })();
  }, [id, jdData.reviewCount]);

  return (
    <Box>
      <TabContext value={value}>
        <TabList
          onChange={handleTabChange}
          sx={{ pt: 2 }}
          TabIndicatorProps={{ style: MainStyles.TabIndicator }}
        >
          <Tab label="상세 정보" value="1" sx={MainStyles.Tab} />
          <Tab
            label={`리뷰(${
              jdData.reviewCount < 9 ? jdData.reviewCount : "9+"
            })`}
            value="2"
            sx={MainStyles.Tab}
          />
        </TabList>
        <TabPanelItem value="1">
          <TabForInfo jdData={jdData} />
        </TabPanelItem>
        <TabPanelItem value="2">
          <TabForReview id={id} />
        </TabPanelItem>
      </TabContext>
    </Box>
  );
}
