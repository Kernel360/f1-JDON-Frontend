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
  const [isAPiError, setApiError] = useState(false);

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
        setApiError(false);
      } catch (error) {
        console.error('Error while fetching data:', error);
        setIsInitialLoad(true);
        setApiError(true);
      }
    },
    [isInitialLoad],
  );

  useEffect(() => {
    if (isInitialLoad) loadData('', false);
    else return;

    if (selectedChip.userSelected && selectedChip.keyword) {
      loadData(selectedChip.keyword, true);
    }
  }, [isInitialLoad, selectedChip, loadData, isAPiError]);

  return { selectedChip, setSelectedChip, lectureList, jdList };
}
