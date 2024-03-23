import useFetchCoffeeChatDetail
  from 'components/coffeechats/detail/queryHooks/useFetchcCoffeeChatDetail';
import ActionButton from 'components/common/button/ActionButton';
import CoffeeChatForm from 'components/common/form/CoffeeChatForm';
import Loading from 'components/common/loading/Loading';
import { useCoffeeForm } from 'hooks/useCoffeeForm';
import { useParams } from 'react-router-dom';
import { theme } from 'styles/themeMuiStyle';

import { useRegisterCoffeeChat } from '../queryHooks/useRegisterCoffeeChat';

function UpdateCoffeeChatForm() {
  const { id } = useParams();

  const { coffeeChatData, isLoading } = useFetchCoffeeChatDetail(id);

  const { formValue, helperTexts, isFormValid, updateFormValue } = useCoffeeForm(coffeeChatData);

  const { update } = useRegisterCoffeeChat();

  const hanldeRegister = (e) => {
    e.preventDefault();
    update(id, formValue);
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
        styles={{
          mt: 1,
          mb: 8,
          background: isFormValid ? theme.palette.primary.main : '#EBEBEB',
          color: isFormValid ? 'white' : '#BCBCC4',
        }}
        title="수정완료"
        onClick={hanldeRegister}
        isDisable={!isFormValid || isLoading}
      />
    </>
  );
}
export default UpdateCoffeeChatForm;
