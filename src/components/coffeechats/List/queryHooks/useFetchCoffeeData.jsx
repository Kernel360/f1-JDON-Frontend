import { getCoffeeChat } from 'api/api';
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
    return response.data.data;
  };

  const {
    data: coffeeData,
    isLoading: loading,
    error,
  } = useQuery(
    ['coffeeData', currentPage, sortData, 검색어], // 이 배열은 쿼리 키로 사용되며, 이 값들이 변경될 때마다 쿼리가 다시 실행됩니다.
    fetchCoffeeData, // 데이터를 가져오는 함수
    {
      keepPreviousData: true,
    },
  );

  return { coffeeData, loading, error };
};

export default useFetchCoffeeData;
