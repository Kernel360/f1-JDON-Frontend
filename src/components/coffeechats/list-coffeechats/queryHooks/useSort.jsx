import { useState } from 'react';

const defaultSortData = {
  sort: 'createdDate',
  jobCategory: '',
};

function useSort() {
  const filterValues = JSON.parse(localStorage.getItem('filters') || '{}');
  const [sortData, setSortData] = useState({ ...defaultSortData, ...filterValues });

  const handleSortDataChange = (title, newSortData) => {
    setSortData((prev) => {
      const updatedSortData = { ...prev, [title]: newSortData };
      localStorage.setItem('filters', JSON.stringify(updatedSortData));
      return updatedSortData;
    });
  };

  return { sortData, setSortData, handleSortDataChange };
}
export default useSort;
