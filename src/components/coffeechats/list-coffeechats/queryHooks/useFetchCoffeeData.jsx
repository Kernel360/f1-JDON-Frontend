import { getCoffeeChat } from 'api/api';
import { delay } from 'constants/delay';
import { useQuery } from 'react-query';

const useFetchCoffeeData = (currentPage, sortData, 검색어) => {
  const fetchCoffeeData = async () => {
    const response = await getCoffeeChat(
      currentPage - 1,
      sortData.pageSize || 12,
      sortData.sort,
      sortData.jobCategory,
      검색어,
    );
    await delay(300);
    return response.data.data;
  };

  const {
    data: coffeeData,
    isLoading,
    isPending,
    error,
  } = useQuery(['coffeeData', currentPage, sortData, 검색어], fetchCoffeeData);

  return { coffeeData, isPending, isLoading, error };
};

export default useFetchCoffeeData;
