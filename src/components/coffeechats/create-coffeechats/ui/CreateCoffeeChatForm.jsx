import ActionButton from 'components/common/button/ActionButton';
import CoffeeChatForm from 'components/common/form/CoffeeChatForm';
import Loading from 'components/common/loading/Loading';
import { useCoffeeForm } from 'hooks/useCoffeeForm';

import useRegisterCoffeeChat from '../queryHooks/useSubmitCoffeeChat';

function CreateCoffeeChatForm() {
  const { formValue, helperTexts, isFormValid, updateFormValue } = useCoffeeForm();

  const { register, isLoading } = useRegisterCoffeeChat();

  const submitCoffeeChat = (e) => {
    e.preventDefault();
    alert('커피챗이 정상적으로 등록되었습니다');
    register(formValue);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <CoffeeChatForm
        formValue={formValue}
        helperTexts={helperTexts}
        updateFormValue={updateFormValue}
      />
      <ActionButton
        styles={{ mt: 1, mb: 8 }}
        title={isLoading ? '등록 중...' : '등록하기'}
        onClick={submitCoffeeChat}
        isDisable={!isFormValid || isLoading}
      />
    </>
  );
}
export default CreateCoffeeChatForm;
