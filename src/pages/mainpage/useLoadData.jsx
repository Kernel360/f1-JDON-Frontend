import { useCallback, useEffect, useState } from 'react';
import { fetchLectureData } from './apiFunction';

export function useLoadData() {
  const [selectedChip, setSelectedChip] = useState({
    keyword: '',
    userSelected: false,
  });
  const [lectureList, setLectureList] = useState([]);
  const [jdList, setJdList] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const loadData = useCallback(
    async (keyword, userSelected) => {
      try {
        const res = await fetchLectureData(encodeURIComponent(keyword));
        setLectureList(res.lectureList);
        setJdList(res.jdList);

        if (isInitialLoad) {
          setSelectedChip({ keyword: res.keyword, userSelected });
          setIsInitialLoad(false);
        }
      } catch (error) {
        console.error('Error while fetching data:', error);
        setIsInitialLoad(true);
      }
    },
    [isInitialLoad],
  );

  useEffect(() => {
    if (isInitialLoad) loadData('', false);
    else {
      if (selectedChip.keyword && selectedChip.userSelected) {
        loadData(selectedChip.keyword, true);
      }
      if (!selectedChip.keyword) {
        setIsInitialLoad(true);
      }
    }
  }, [isInitialLoad, selectedChip, loadData]);

  return { selectedChip, setSelectedChip, lectureList, jdList };
}
