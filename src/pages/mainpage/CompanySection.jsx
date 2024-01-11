import { Box, Grid, Typography } from "@mui/material";
import CompanyCard from "../../components/common/card/CompanyCard";
import { MainStyles } from "../PageStyles";

function CompanySection({ selectdChip, data }) {
  return (
    <Box sx={{ mt: 12 }}>
      <Typography sx={MainStyles.TypoGraphy}>
        <span style={{ color: "black", fontWeight: 600, margin: "2px 8px" }}>
          {selectdChip}
        </span>
        에 관심있는 회사에요!
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 3, md: 3 }}>
        {data.map((item, index) => (
          <Grid item xs={6} sm={4} md={4} key={index}>
            <CompanyCard data={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CompanySection;
