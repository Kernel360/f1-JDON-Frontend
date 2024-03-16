import { useState } from 'react';
import useFetchJobCategories from './useFetchJobCategory';

function useJDSearchBar() {
  const defaultSortData = {
    sort: 'createdDate',
    jobCategory: '',
  };
  const filterValues = JSON.parse(localStorage.getItem('filters') || '{}');
  const prevKeyword = JSON.parse(localStorage.getItem('keyword'));

  const [sortData, setSortData] = useState({ ...defaultSortData, ...filterValues });
  const [keyword, setKeyword] = useState(prevKeyword || '');

  const { jobCategories } = useFetchJobCategories();

  const handleSortDataChange = (title, newSortData) => {
    setSortData((prev) => {
      const updatedSortData = { ...prev, [title]: newSortData };
      localStorage.setItem('filters', JSON.stringify(updatedSortData));
      return updatedSortData;
    });
  };

  return { keyword, setKeyword, sortData, jobCategories, handleSortDataChange };
}

export default useJDSearchBar;
