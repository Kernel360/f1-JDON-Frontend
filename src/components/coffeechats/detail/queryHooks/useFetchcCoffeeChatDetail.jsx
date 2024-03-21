import { useEffect, useState } from 'react';

import { getCoffeeChatDetail } from 'api/api';

function useFetchCoffeeChatDetail(id) {
  const [coffeeChatData, setCoffeeChatData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isParticipant, setIsParticipant] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await getCoffeeChatDetail(id);
        setCoffeeChatData(res);
        setIsParticipant(res.isParticipant);
      } catch (error) {
        console.error('Error fetching getCoffeeChatDetail:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  return { coffeeChatData, isLoading, isParticipant, setIsParticipant };
}

export default useFetchCoffeeChatDetail;
