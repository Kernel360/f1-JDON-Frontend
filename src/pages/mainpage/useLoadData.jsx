import { useCallback, useEffect, useState } from "react";
import { fetchLectureData } from "./apiFunction";

export function useLoadData() {
  const [selectedChip, setSelectedChip] = useState({});
  const [lectureList, setLectureList] = useState([]);
  const [jdList, setJdList] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const loadData = useCallback(
    async (keyword, userSelected = false) => {
      const lectureData = await fetchLectureData(keyword);
      setLectureList(lectureData.lectureList);
      setJdList(lectureData.jdList);
      if (isInitialLoad || userSelected) {
        setSelectedChip({ keyword: lectureData.keyword, userSelected });
        setIsInitialLoad(false);
      }
    },
    [isInitialLoad]
  );

  useEffect(() => {
    if (isInitialLoad) {
      loadData("", false);
    }
  }, [isInitialLoad, loadData]);

  useEffect(() => {
    if (selectedChip.userSelected) {
      loadData(selectedChip.keyword, true);
    }
  }, [selectedChip, loadData]);

  return { selectedChip, setSelectedChip, lectureList, jdList };
}
