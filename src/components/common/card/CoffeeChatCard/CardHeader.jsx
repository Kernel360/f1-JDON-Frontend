import { Box, Typography } from "@mui/material";
import BadgeForStatus from "./BadgeForStatus";
import BadgeForJob from "./BadgeForJob";
import eyeIcon from "../../../../assets/icons/eye.svg";
import { headerStyles } from "./CoffeeChatCardStyle";

function CardHeader({ data, jobNum }) {
  return (
    <Box sx={headerStyles.container}>
      <Box display="flex" gap={1}>
        <BadgeForStatus data={data} />
        <BadgeForJob jobNum={jobNum} data={data} />
      </Box>
      <Typography sx={headerStyles.viewCount}>
        <img src={eyeIcon} alt="조회수" />
        {data.viewCount}
      </Typography>
    </Box>
  );
}

export default CardHeader;
