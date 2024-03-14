import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { cardStyles } from './CoffeeChatCardStyle';
import CardBody from './CardBody';
import CardHeader from './CardHeader';
import { cancelCoffeechat } from 'api/api';

function CoffeeChatCard({ data, kindOfJd, isMyCoffeeChat,refetchData }) {
  const navigate = useNavigate();

  const jobNum = useMemo(
    () => kindOfJd?.find((jd) => jd.name === data.hostJobCategoryName)?.id,
    [kindOfJd, data.hostJobCategoryName],
  );

  const handleClick = () => {
    if (data.activeStatus === '모집종료') {
      alert('종료된 커피챗입니다.');
      return;
    }
    navigate(`/coffee/${data.coffeeChatId}`);
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
      <CardHeader jobNum={jobNum} data={data} />
      <CardBody
        data={data}
        isMyCoffeeChat={isMyCoffeeChat}
        hanldeCancelCoffeeChat={hanldeCancelCoffeeChat}
      />
    </Paper>
  );
}

export default CoffeeChatCard;
