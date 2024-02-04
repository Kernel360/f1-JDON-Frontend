import { Box, Grid, Typography } from "@mui/material";
import { MainStyles } from "../PageStyles";
import VideoCard from "../../components/common/card/VideoCard";
import hot from "../../../src/assets/images/hot.svg";

function VideoSection({ selectedChip, data }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography sx={MainStyles.TypoGraphy}>
        <span style={{ fontWeight: 700, color: "black", margin: "2px 8px" }}>
          {selectedChip.keyword}
        </span>
        추천 학습 영상
        <img src={hot} alt="hot" />
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            background: "#F9F9F9",
            borderRadius: "10px",
            mt: 2,
            width: "100%",
          }}
        >
          {data.length > 0 ? (
            <Grid container spacing={{ xs: 2, md: 2 }} sx={{ px: 2, py: 1 }}>
              {data.map((item, index) => (
                <Grid item xs={12} sm={4} md={4} key={index}>
                  <VideoCard data={item} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box container spacing={{ xs: 2, md: 2 }} sx={{ px: 2, py: 1 }}>
              <div
                style={{
                  fontSize: "16px",
                  color: "#B9B9B9",
                  fontWeight: 600,
                  textAlign: "center",
                  padding: "100px 0",
                }}
              >
                영상 데이터가 존재하지 않습니다
              </div>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default VideoSection;
