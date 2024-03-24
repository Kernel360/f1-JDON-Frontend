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
        if (error.response?.status === 409) {
          alert('이미 신청된 커피챗입니다.');
        } else {
          console.error('신청 중 에러가 발생했습니다.');
        }
      },
    },
  );

  const apply = (applyCoffeeValue) => {
    mutate(applyCoffeeValue);
  };

  return { apply, isLoading, error };
};

export default useApplyForCoffeeChat;
