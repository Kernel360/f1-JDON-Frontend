import { getCoffeeChatDetail } from 'api/api';
import { useQuery } from 'react-query';

function useFetchCoffeeChatDetail(id) {
  const { data, error, isLoading } = useQuery(
    ['coffeeChatDetail', id],
    () => getCoffeeChatDetail(id),
    {
      enabled: !!id,
    },
  );

  return {
    data,
    isLoading,
    error,
  };
}

export default useFetchCoffeeChatDetail;
