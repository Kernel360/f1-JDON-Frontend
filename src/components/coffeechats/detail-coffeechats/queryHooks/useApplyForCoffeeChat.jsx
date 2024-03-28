import { applyCoffeechat } from 'api/api';
import { useMutation } from 'react-query';

const useApplyForCoffeeChat = (id) => {
  const { mutate, isLoading, error } = useMutation(
    (applyCoffeeValue) => applyCoffeechat(id, applyCoffeeValue),
    {
      onSuccess: () => {
        alert('신청이 완료되었습니다.');
      },
      onError: (error) => {
        alert(error.response.data.message);
      },
    },
  );

  const apply = (applyCoffeeValue) => {
    mutate(applyCoffeeValue);
  };

  return { apply, isLoading, error };
};

export default useApplyForCoffeeChat;
