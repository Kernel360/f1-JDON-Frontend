import { Box, Grid, Typography } from "@mui/material";
import { MainStyles } from "../PageStyles";
import VideoCard from "../../components/common/card/VideoCard";
import hot from "../../../src/assets/images/hot.svg";

function VideoSection({ selectdChip, data }) {
  console.log(data);
  return (
    <Box sx={{ mt: 4 }}>
      <Typography sx={MainStyles.TypoGraphy}>
        <span style={{ fontWeight: 700, color: "black", margin: "2px 8px" }}>
          {selectdChip.keyword}
        </span>
        추천 학습 영상
        <img src={hot} alt="hot" />
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            background: "#F9F9F9",
            width: "100%",
            borderRadius: "10px",
            mt: 2,
          }}
        >
          <Grid container spacing={{ xs: 2, md: 2 }} sx={{ px: 2, py: 1 }}>
            {data.map((item, index) => (
              <Grid item xs={12} sm={4} md={4} key={index}>
                <VideoCard data={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default VideoSection;
