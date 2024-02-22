import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { MainStyles } from "../../PageStyles";
import { useState } from "react";
import { mock, reviewMock } from "./mock";
import { usePopup } from "./usePopup";
import { TabForInfo } from "./TabForInfo";
import { TabForReview } from "./TabForReview";
import { ReviewPopup } from "./ReviewPopup";

export function CategoryTab() {
  const { isOpen, openPopup, closePopup } = usePopup();
  const [value, setValue] = useState("1");
  const mockData = mock;
  const reviewData = reviewMock;

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <ReviewPopup isOpen={isOpen} closePopup={closePopup} />
      <TabContext value={value}>
        <TabList
          onChange={handleTabChange}
          sx={{ pt: 2 }}
          TabIndicatorProps={{ style: MainStyles.TabIndicator }}
        >
          <Tab label="상세 정보" value="1" sx={MainStyles.Tab} />
          <Tab label="리뷰" value="2" sx={MainStyles.Tab} />
        </TabList>

        <TabPanelItem value="1">
          <TabForInfo mockData={mockData} />
        </TabPanelItem>
        <TabPanelItem value="2">
          <TabForReview reviewData={reviewData} openPopup={openPopup} />
        </TabPanelItem>
      </TabContext>
    </Box>
  );
}

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
