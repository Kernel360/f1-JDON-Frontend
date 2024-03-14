import { Box, Typography } from '@mui/material';
import CoffeeInfoItem from './CoffeeInfoItem';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { formattedDate, formattedTime } from 'utils/formatDate';
import { cardBodyStyle } from './CoffeeChatCardStyle';
import RoundButton from 'components/common/new-btn/RoundButton';

function CardBody({ data, isMyCoffeeChat, hanldeCancelCoffeeChat }) {
  const InfoValue = [
    {
      icon: CalendarMonthIcon,
      text: formattedDate(data.meetDate),
      color: '#FF6565',
    },
    {
      icon: AccessTimeFilledIcon,
      text: formattedTime(data.meetDate),
      color: '#52BF91',
    },
    {
      icon: PeopleAltIcon,
      text: `${data.currentRecruitCount} / ${data.totalRecruitCount}`,
      color: '#575757',
    },
  ];

  return (
    <Box sx={cardBodyStyle.container}>
      <Typography variant="body2" color="#9A9AA1" sx={{ display: 'flex' }}>
        {data.nickname}
      </Typography>
      <Typography color="#545459" fontWeight="600" sx={cardBodyStyle.title}>
        {data.title}
      </Typography>
      <Box display="flex">
        <Box sx={cardBodyStyle.infoBox}>
          {InfoValue.map((item, index) => (
            <CoffeeInfoItem key={index} Icon={item.icon} text={item.text} color={item.color} />
          ))}
        </Box>
        {isMyCoffeeChat && (
          <Box marginTop={10}>
            <RoundButton title="신청 취소" onClick={hanldeCancelCoffeeChat} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default CardBody;
