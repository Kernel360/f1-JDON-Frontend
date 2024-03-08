import { Box, Typography } from "@mui/material";
import { jobStyle } from "components/common/card/CardStyle";

import eyeIcon from "assets/icons/eye.svg";
import { useRecoilValue } from "recoil";
import { kindOfJdState } from "recoil/atoms";
import { buttonStyles } from "../ButtonStyle";

const JobBadge = ({ job }) => {
  const kindOfJd = useRecoilValue(kindOfJdState);
  const jobNum = kindOfJd.find((jd) => jd.name === job)?.id;
  return jobNum ? <Box sx={jobStyle(jobNum)}>{job}</Box> : null;
};

function HostInfoWithViewcount({ coffeeChatData }) {
  return (
    <Box sx={buttonStyles.UpTitle}>
      <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <Typography
          sx={{ color: "#9A9AA1", fontWeight: 400, fontSize: "13px" }}
        >
          {coffeeChatData.nickname}
        </Typography>
        {coffeeChatData.hostJobCategoryName && (
          <JobBadge job={coffeeChatData.hostJobCategoryName} />
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
        <img src={eyeIcon} alt="조회수" />
        {coffeeChatData.viewCount}
      </Typography>
    </Box>
  );
}

export default HostInfoWithViewcount;
