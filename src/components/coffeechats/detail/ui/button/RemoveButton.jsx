import { deleteCoffeechat } from 'api/api';
import NewBtn from 'components/common/button/NewBtn';
import { useNavigate } from 'react-router-dom';
import { theme } from 'styles/themeMuiStyle';

function RemoveButton({ title, isDisable, id, coffeeChatData }) {
  const navigate = useNavigate();
  const removeCoffeeChat = async () => {
    let confirmation = true;
    if (coffeeChatData.currentRecruitCount > 0) {
      confirmation = window.confirm(
        '삭제하려는 커피챗에 참여 신청한 회원이 존재합니다. \n 정말 삭제하시겠습니까?',
      );
    }

    if (confirmation) {
      try {
        await deleteCoffeechat(id);
        alert('삭제가 완료되었습니다.');
        navigate('/coffee');
      } catch (error) {
        console.error('삭제 중 오류가 발생했습니다. : ', error);
      }
    }
  };
  return (
    <NewBtn
      title={title}
      styles={{
        background: isDisable ? '#EBEBEB' : theme.palette.primary.main,
        color: 'white',
      }}
      onClick={removeCoffeeChat}
      disable={isDisable}
    />
  );
}
export default RemoveButton;
