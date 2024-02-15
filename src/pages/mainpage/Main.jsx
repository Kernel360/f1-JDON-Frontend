import { Container } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import BottomNav from "../../components/common/BottomNav";
import CompanySection from "./CompanySection";
import VideoSection from "./VideoSection";
import HeaderWithSearchBar from "./HeaderWithSearchBar";
import SubmitBug from "./SubmitBug";
import StickyTabSection from "./StickyTabSection";
import { fetchLectureData, fetchUserInfo } from "./apiFunction";

export function Main() {
  const [selectedChip, setSelectedChip] = useState({
    keyword: "",
    userSelected: false,
  });
  const [lectureList, setLectureList] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [jdList, setJdList] = useState([]);

  const loadData = useCallback(
    async (keyword, userSelected) => {
      const lectureData = await fetchLectureData(keyword);
      setLectureList(lectureData.lectureList);
      setJdList(lectureData.jdList);
      if (isInitialLoad) {
        setSelectedChip({ keyword: lectureData.keyword, userSelected });
        setIsInitialLoad(false);
      }
    },
    [isInitialLoad]
  );

  useEffect(() => {
    if (isInitialLoad) {
      loadData("", false);
      fetchUserInfo();
      setIsInitialLoad(false);
    }
  }, [isInitialLoad, loadData]);

  useEffect(() => {
    if (selectedChip.userSelected) {
      loadData(selectedChip.keyword);
      setIsInitialLoad(false);
    }
  }, [selectedChip, loadData]);

  return (
    <Container maxWidth="md" sx={{ pb: 10, position: "relative" }}>
      <HeaderWithSearchBar setSelectedChip={setSelectedChip} />
      <StickyTabSection
        selectedChip={selectedChip}
        setSelectedChip={setSelectedChip}
      />
      <VideoSection selectedChip={selectedChip} data={lectureList} />
      <CompanySection selectedChip={selectedChip} data={jdList} />
      <SubmitBug />
      <BottomNav />
    </Container>
  );
}
