import { useState } from 'react';

import { registerCoffeeChat } from 'api/api';
import NewBtn from 'components/common/button/NewBtn';
import { useCoffeeForm } from 'hooks/useCoffeeForm';
import { useNavigate } from 'react-router-dom';
import { theme } from 'styles/themeMuiStyle';

const { default: CoffeeChatForm } = require('components/common/form/CoffeeChatForm');

function CreateCoffeeChatForm() {
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();
  const { formValue, helperTexts, isFormValid, updateFormValue } = useCoffeeForm({
    title: '',
    content: '',
    totalRecruitCount: '',
    meetDate: '',
    openChatUrl: '',
  });

  const submitCoffeeChat = async (e) => {
    e.preventDefault();
    if (isRegistered) {
      alert('이미 등록된 커피챗입니다.');
      return;
    }
    try {
      const res = await registerCoffeeChat(formValue);
      setIsRegistered(true);
      alert('등록이 완료되었습니다.');
      navigate(`/coffee/${res.data.coffeeChatId}`);
    } catch (error) {
      const { message } = error.response.data;
      alert(message);
    }
  };
  return (
    <>
      <CoffeeChatForm
        formValue={formValue}
        helperTexts={helperTexts}
        updateFormValue={updateFormValue}
      />
      <NewBtn
        title={isRegistered ? '이미 등록된 커피챗입니다.' : '등록하기'}
        onClick={submitCoffeeChat}
        disable={!isFormValid || isRegistered}
        isActive={!isFormValid || isRegistered}
        styles={{
          width: '100%',
          p: '13px',
          fontSize: '16px',
          borderRadius: '999px',
          background: !isRegistered && isFormValid ? theme.palette.primary.main : '#EBEBEB',
          color: !isRegistered && isFormValid ? 'white' : '#BCBCC4',
        }}
      />
    </>
  );
}
export default CreateCoffeeChatForm;
