import { getAllJDByKeyword } from 'api/api';
import { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { jdSearchValue } from 'recoil/atoms';

function useJDComponents() {
  const searchValue = useRecoilValue(jdSearchValue);
  const resetSearchValue = useResetRecoilState(jdSearchValue);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobData, setJobData] = useState({
    content: [],
    pageInfo: {
      totalPages: 0,
      pageSize: 12,
      first: true,
      last: false,
      empty: true,
    },
  });

  // 추후 스켈레톤 UI 반영 시 지울 내용입니다.
  const [foundTxt, setFoundTxt] = useState('회사 정보 불러오는 중..');

  useEffect(() => {
    resetSearchValue();
    const timer = setTimeout(() => {
      setFoundTxt('관련된 회사 정보가 존재하지 않습니다.');
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue]);

  useEffect(() => {
    (async (currentPage) => {
      try {
        const data = await getAllJDByKeyword(
          currentPage - 1,
          jobData.pageInfo.pageSize || 12,
          searchValue,
        );
        setJobData(data);
      } catch (error) {
        console.error('Error fetching getJDAll:', error);
      }
    })(currentPage);
  }, [currentPage, jobData.pageInfo.pageSize, searchValue]);

  const handlePageChange = (_, newPage) => {
    setCurrentPage(newPage);
  };

  return { jobData, foundTxt, currentPage, handlePageChange };
}

export default useJDComponents;
