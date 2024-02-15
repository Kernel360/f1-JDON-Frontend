import { Box, Typography } from "@mui/material";
import { jobStyle } from "../../components/common/card/CardStyle";
import { buttonStyles } from "./ButtonStyle";
import eye from "../../assets/icons/eye.svg";

function HostInfoWithViewcount({ coffeeChatData }) {
  return (
    <Box sx={buttonStyles.UpTitle}>
      <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <Typography
          sx={{ color: "#9A9AA1", fontWeight: 400, fontSize: "13px" }}
        >
          {coffeeChatData.nickname}
        </Typography>
        {coffeeChatData.job && (
          <div style={jobStyle(coffeeChatData.job)}>{coffeeChatData.job}</div>
        )}
      </Box>
      <Typography
        sx={{
          color: "#B9B9B9",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <img src={eye} alt="조회수" />
        {coffeeChatData.viewCount}
      </Typography>
    </Box>
  );
}

export default HostInfoWithViewcount;
