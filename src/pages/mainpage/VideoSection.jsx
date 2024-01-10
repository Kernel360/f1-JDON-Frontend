import { Box, Grid, Typography } from "@mui/material";
import { MainStyles } from "../PageStyles";
import VideoCard from "../../components/common/card/VideoCard";
import hot from "../../../src/assets/images/hot.svg";

function VideoSection({ selectdChip, data }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography sx={MainStyles.TypoGraphy}>
        <span style={{ color: "#FF814D", fontWeight: 600 }}></span>
        <img src={hot} alt="hot" />
        추천 학습 영상
      </Typography>
      <Box
        sx={{
          background: "#F5F5F5",
          width: "100%",
          borderRadius: "10px",
          mt: 2,
          boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.1)",
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
  );
}

export default VideoSection;
