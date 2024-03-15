import { useState, useEffect } from 'react';
import { getCoffeeChat } from 'api/api';
import { useRecoilState } from 'recoil';
import { coffeeChatListState } from 'recoil/atoms';

const useFetchCoffeeData = (currentPage, sortData, searchKeyword) => {
  const [coffeeData, setCoffeeData] = useRecoilState(coffeeChatListState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCoffeeData = async () => {
    setLoading(true);
    try {
      const data = await getCoffeeChat(
        currentPage - 1,
        sortData.pageSize || 12,
        sortData.sort,
        sortData.jobCategory,
        searchKeyword,
      );
      setCoffeeData(data.data.data);
      setError(null);
    } catch (error) {
      setError(error);
      setCoffeeData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoffeeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, sortData, searchKeyword]);

  return { coffeeData, fetchCoffeeData, loading, error };
};

export default useFetchCoffeeData;
