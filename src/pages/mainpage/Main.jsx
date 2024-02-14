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

  //loadData 함수가 컴포넌트의 렌더링마다 새롭게 생성되기 때문에, 이 함수를 의존성 배열에 넣은 useEffect 훅이 매 렌더링마다 재실행될 위험이 있음을 알려줍니다. useCallback 훅을 사용하여 loadData 함수를 메모이제이션함으로써, 함수가 필요할 때만 재생성되도록 할 수 있습니다. 이렇게 하면 성능 최적화에 도움이 됩니다.
  //useCallback의 의존성 배열에 loadData 함수가 사용하는 모든 상태나 props를 명시함으로써, 해당 상태나 props가 변경될 때만 loadData 함수를 재생성하
  //useCallback을 사용하여 loadData 함수를 감싸면, 해당 함수는 의존성 배열에 명시된 값이 변경될 때만 재생성됩니다. loadData 함수가 변경되지 않는 한, 의존성 배열에 있는 다른 값들이 변해도 useEffect는 loadData 함수 때문에 재실행되지 않습니다.

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

  const handleChipChange = (keyword) => {
    setSelectedChip({ keyword, userSelected: true });
    // keyword와 userSelected 두 속성 모두 새로운 값으로 설정! 즉, 기존 상태의 다른 속성 값을 유지할 필요가 없기 때문에 ...prev를 사용하지 않아도 된다
  };

  return (
    <Container maxWidth="md" sx={{ pb: 10, position: "relative" }}>
      <HeaderWithSearchBar
        setSelectedChip={setSelectedChip}
        setIsSeletected={handleChipChange}
      />
      <StickyTabSection
        selectedChip={selectedChip}
        setSelectedChip={setSelectedChip}
        setIsSeletected={handleChipChange}
      />
      <VideoSection selectedChip={selectedChip} data={lectureList} />
      <CompanySection selectedChip={selectedChip} data={jdList} />
      <SubmitBug />
      <BottomNav />
    </Container>
  );
}
