import { Box, Grid, Typography } from "@mui/material";
import { MainStyles } from "../PageStyles";
import VideoCard from "../../components/common/card/VideoCard";

function VideoSection({ selectdChip, data }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography sx={MainStyles.TypoGraphy}>
        <span style={{ color: "#FF814D", fontWeight: 600 }}>{selectdChip}</span>{" "}
        학습 영상
      </Typography>
      <Grid container spacing={{ xs: 2, md: 2 }}>
        {data.map((item, index) => (
          <Grid item xs={4} sm={4} md={4} key={index}>
            <VideoCard data={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default VideoSection;
