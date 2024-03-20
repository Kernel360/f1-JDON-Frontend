import { useEffect } from 'react';

import { getCoffeeChatDetail, updateCoffeechat } from 'api/api';
import NewBtn from 'components/common/button/NewBtn';
import { useCoffeeForm } from 'hooks/useCoffeeForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/atoms';
import { theme } from 'styles/themeMuiStyle';

const { default: CoffeeChatForm } = require('components/common/form/CoffeeChatForm');

function UpdateCoffeeChatForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const loginState = useRecoilValue(isLoggedInState);
  const { formValue, setFormValue, helperTexts, isFormValid, updateFormValue } = useCoffeeForm({
    title: '',
    content: '',
    totalRecruitCount: '',
    meetDate: '',
    openChatUrl: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await getCoffeeChatDetail(id);
        setFormValue({
          title: res.title || '',
          content: res.content || '',
          totalRecruitCount: res.totalRecruitCount || '',
          meetDate: res.meetDate || '',
          openChatUrl: res.openChatUrl || '',
        });
        if (res.hostId !== loginState.memberId) {
          alert('본인이 작성하지 않은 커피챗의 상태를 변경할 수 없습니다.');
          navigate('/coffee');
        }
      } catch (error) {
        if (error.response.status) {
          navigate('/404');
        }
        console.error('Error fetching coffee chat detail:', error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, navigate, setFormValue]);

  const hanldeRegister = async (e) => {
    e.preventDefault();
    try {
      await updateCoffeechat(id, formValue);
      alert('커피챗이 수정되었습니다.');
      navigate(`/coffee/${id}`);
    } catch (error) {
      const { message } = error.response.data;
      alert(message);
      console.error('Error fetching hot skills:', error);
    }
  };

  return (
    <>
      <CoffeeChatForm
        formValue={formValue}
        helperTexts={helperTexts}
        isFormValid={isFormValid}
        updateFormValue={updateFormValue}
        submitCoffeeChat={hanldeRegister}
      />
      <NewBtn
        title="수정완료"
        onClick={hanldeRegister}
        disable={!isFormValid}
        isActive={!isFormValid}
        styles={{
          mt: 3,
          mb: 3,
          width: '100%',
          p: '13px',
          borderRadius: '999px',
          background: isFormValid ? theme.palette.primary.main : '#EBEBEB',
          color: isFormValid ? 'white' : '#BCBCC4',
          fontSize: '16px',
        }}
      />
    </>
  );
}
export default UpdateCoffeeChatForm;
