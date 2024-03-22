import { registerCoffeeChat } from 'api/api';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

function useRegisterCoffeeChat() {
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation(registerCoffeeChat, {
    onSuccess: (data) => {
      navigate(`/coffee/${data.data.coffeeChatId}`);
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const register = (formValue) => {
    mutate(formValue);
  };

  return { register, isLoading, error };
}

export default useRegisterCoffeeChat;
