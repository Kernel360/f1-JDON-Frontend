import { useEffect, useState } from 'react';
import useFetchJobCategories from './useFetchJobCategory';

function useJDSearchBar() {
  const defaultSortData = {
    sort: 'latest',
    jobCategory: '',
    jobSkills: '',
  };
  const filterValues = JSON.parse(localStorage.getItem('filters') || '{}');

  const prevKeyword = JSON.parse(localStorage.getItem('keyword'));

  const [sortData, setSortData] = useState({ ...defaultSortData, ...filterValues });
  const [keyword, setKeyword] = useState(prevKeyword || '');

  const [jobCategories, setJobCategories] = useState([]);

  useEffect(() => {
    const fetchJobCategories = async () => {
      try {
        const { jobCategories } = await useFetchJobCategories;
        setJobCategories(jobCategories);
      } catch (error) {
        console.error('Error fetching job categories:', error);
      }
    };

    fetchJobCategories();
  }, []);

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
