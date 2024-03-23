import { getCoffeeChatDetail } from 'api/api';
import { useQuery } from 'react-query';

const fetchCoffeeChatDetail = async (id) => {
  const response = await getCoffeeChatDetail(id);
  return response;
};

function useFetchCoffeeChatDetail(id) {
  const {
    data: coffeeChatData,
    isLoading,
    error,
  } = useQuery(['coffeeChatDetail', id], () => fetchCoffeeChatDetail(id));

  return { coffeeChatData, isLoading, error };
}

export default useFetchCoffeeChatDetail;
