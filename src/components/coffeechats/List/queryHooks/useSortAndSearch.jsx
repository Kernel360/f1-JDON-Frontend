const { useState } = require('react');

const defaultSortData = {
  sort: 'createdDate',
  jobCategory: '',
};

function useSortAndSearch() {
  const filterValues = JSON.parse(localStorage.getItem('filters') || '{}');
  const prevKeyword = JSON.parse(localStorage.getItem('keyword')) || '';

  const [sortData, setSortData] = useState({ ...defaultSortData, ...filterValues });

  const [검색어, set검색어] = useState(prevKeyword);

  const handleSortDataChange = (title, newSortData) => {
    setSortData((prev) => {
      const updatedSortData = { ...prev, [title]: newSortData };
      localStorage.setItem('filters', JSON.stringify(updatedSortData));
      return updatedSortData;
    });
  };

  return {
    sortData,
    setSortData,
    검색어,
    set검색어,
    handleSortDataChange,
  };
}

export default useSortAndSearch;
