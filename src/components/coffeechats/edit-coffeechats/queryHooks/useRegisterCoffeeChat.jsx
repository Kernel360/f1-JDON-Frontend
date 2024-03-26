import { updateCoffeechat } from 'api/api';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export function useRegisterCoffeeChat() {
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation(
    (data) => updateCoffeechat(data.id, data.formValue),
    {
      onSuccess: (_, variables) => {
        alert('커피챗이 수정되었습니다.');
        navigate(`/coffee/${variables.id}`);
      },
      onError: (error) => {
        const message = error.response?.data?.message || 'An error occurred';
        alert(message);
        console.error('Error updating coffee chat:', error);
      },
    },
  );

  const update = (id, formValue) => {
    mutate({ id, formValue });
  };

  return { update, isLoading, error };
}
