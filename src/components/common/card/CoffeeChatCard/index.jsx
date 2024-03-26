import { cancelCoffeechat } from 'api/api';
import { useNavigate } from 'react-router-dom';

import { Paper } from '@mui/material';

import CardBody from './CardBody';
import CardHeader from './CardHeader';
import { cardStyles } from './CoffeeChatCardStyle';

function CoffeeChatCard({ data, isMyCoffeeChat, refetchData, pathName }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (data.activeStatus === '모집종료') {
      alert('종료된 커피챗입니다.');
      return;
    }
    navigate(`/coffee/${data.coffeeChatId}`);
    if (pathName === undefined) localStorage.setItem('back_path', pathName);
  };

  const hanldeCancelCoffeeChat = async () => {
    const isConfirmed = window.confirm('정말 취소하시겠습니까?');
    if (!isConfirmed) return;

    try {
      const res = await cancelCoffeechat(data.coffeeChatId);
      if (res) refetchData();
    } catch (error) {
      const errorMessage = error.response?.data?.message || '취소 처리 중 오류가 발생했습니다.';
      alert(errorMessage);
    }
  };

  return (
    <Paper onClick={handleClick} elevation={0} sx={cardStyles(data)}>
      <CardHeader data={data} />
      <CardBody
        data={data}
        isMyCoffeeChat={isMyCoffeeChat}
        hanldeCancelCoffeeChat={hanldeCancelCoffeeChat}
      />
    </Paper>
  );
}

export default CoffeeChatCard;
