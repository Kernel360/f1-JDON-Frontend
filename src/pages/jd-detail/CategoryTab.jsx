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
  const [reviewNum, setReviewNum] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await getJdDetail(id);
      setJdData(res);
      setReviewNum(res.reviewCount);
      setIsLoading(false);
    })();
  }, [id]);

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
            label={
              isLoading
                ? "리뷰 로딩 중..."
                : `리뷰(${reviewNum < 9 ? reviewNum : "9+"})`
            }
            value="2"
            sx={MainStyles.Tab}
          />
        </TabList>
        <TabPanelItem value="1">
          <TabForInfo jdData={jdData} />
        </TabPanelItem>
        <TabPanelItem value="2">
          <TabForReview id={id} setReviewNum={setReviewNum} />
        </TabPanelItem>
      </TabContext>
    </Box>
  );
}
