import { useCallback, useEffect, useState } from 'react';
import { fetchLectureData } from '../apiFunction';

export function useLoadData() {
  const [selectedChip, setSelectedChip] = useState({
    keyword: '',
    userSelected: false,
  });
  const [lectureList, setLectureList] = useState([]);
  const [jdList, setJdList] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(
    async (keyword, userSelected) => {
      setLoading(true);
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
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [isInitialLoad, selectedChip, loadData]);

  return { loading, selectedChip, setSelectedChip, lectureList, jdList };
}
