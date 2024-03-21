import { useState } from 'react';

import { getCoffeeChat } from 'api/api';
import { useRecoilState } from 'recoil';
import { coffeeChatListState } from 'recoil/atoms';

const useFetchCoffeeData = (currentPage, sortData, 검색어) => {
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
        검색어,
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

  return { coffeeData, loading, error, fetchCoffeeData };
};

export default useFetchCoffeeData;
