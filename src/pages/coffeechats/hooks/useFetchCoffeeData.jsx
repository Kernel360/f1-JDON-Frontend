import { useState, useEffect } from 'react';
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

  useEffect(() => {
    console.log(검색어);
    fetchCoffeeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, sortData, 검색어]);

  return { coffeeData, loading, error };
};

export default useFetchCoffeeData;
