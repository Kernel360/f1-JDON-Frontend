import {
  useEffect,
  useState,
} from 'react';

import { getJobCategory } from 'api/api';
import { useRecoilState } from 'recoil';
import { kindOfJdState } from 'recoil/atoms';

const useFetchJobCategories = () => {
  const [jobCategories, setJobCategories] = useRecoilState(kindOfJdState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobCategories = async () => {
      setLoading(true);
      try {
        const { jobGroupList } = await getJobCategory();
        setJobCategories(jobGroupList[0].jobCategoryList);
        localStorage.setItem('jobCategories', JSON.stringify(jobGroupList[0].jobCategoryList));
        setError(null);
      } catch (error) {
        setError(error);
        setJobCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobCategories();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { jobCategories, loading, error, setJobCategories };
};

export default useFetchJobCategories;
