import { userInfoItemStyle } from '../styles';

const { Box } = require('@mui/material');

function userInfoItem({ title, content }) {
  return <Box sx={userInfoItemStyle}>{`${title} : ${content}`}</Box>;
}

export default userInfoItem;
