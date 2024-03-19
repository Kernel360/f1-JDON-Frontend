import { getAllJDByKeyword } from 'api/api';
import { useEffect, useState } from 'react';
import { useResetRecoilState } from 'recoil';
import { jdSearchValue } from 'recoil/atoms';

function useJDComponents(keyword, sortData) {
  const searchKeyword = keyword;
  const searchSortData = sortData;

  const resetSearchValue = useResetRecoilState(jdSearchValue);
  const pageNum = JSON.parse(localStorage.getItem('page'));
  const searchOption = localStorage.getItem('searchOption');
  const [currentPage, setCurrentPage] = useState(pageNum || 1);
  const maxPage = Number(localStorage.getItem('totalPages'));
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

  const [foundTxt, setFoundTxt] = useState('');
  const [loading, setLoading] = useState(false);

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
    if (maxPage < currentPage) setCurrentPage(1);
  }, [maxPage, currentPage]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getAllJDByKeyword(
          currentPage - 1, // page
          jobData.pageInfo.pageSize || 12, // size
          searchSortData.jobSkills, // skill
          searchSortData.jobCategory, // jobCategory
          searchOption, // keywordType
          searchKeyword, //keyword
          searchSortData.sort, // sort
        );
        setJobData(data);
        localStorage.setItem('totalPages', JSON.stringify(data.pageInfo.totalPages));
      } catch (error) {
        console.error('Error fetching getJDAll', error);
      }
      const timer = setTimeout(() => {
        setLoading(false);
      }, 200);
      return () => {
        clearTimeout(timer);
      };
    })(currentPage);
  }, [currentPage, searchOption, jobData.pageInfo.pageSize, searchKeyword, searchSortData]);

  const handlePageChange = (_, newPage) => {
    setCurrentPage(newPage);
  };

  return { jobData, foundTxt, currentPage, handlePageChange, loading };
}

export default useJDComponents;
