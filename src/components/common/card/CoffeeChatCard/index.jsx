import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { cardStyles } from './CoffeeChatCardStyle';
import CardBody from './CardBody';
import CardHeader from './CardHeader';
import { deleteCoffeechat } from 'api/api';

function CoffeeChatCard({ data, kindOfJd, isMyCoffeeChat, refetchData }) {
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

  const hanldeDeleteCoffeeChat = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await deleteCoffeechat(data.coffeeChatId);
      refetchData();
    } catch (error) {
      const { message } = error.response.data;
      alert(message);
      return;
    }
  };

  return (
    <Paper onClick={handleClick} elevation={0} sx={cardStyles(data)}>
      <CardHeader jobNum={jobNum} data={data} />
      <CardBody
        data={data}
        isMyCoffeeChat={isMyCoffeeChat}
        hanldeDeleteCoffeeChat={hanldeDeleteCoffeeChat}
      />
    </Paper>
  );
}

export default CoffeeChatCard;
