import { Box, Grid, Typography } from "@mui/material";
import CompanyCard from "../../components/common/card/CompanyCard";
import { MainStyles } from "../PageStyles";

function CompanySection({ selectdChip, data }) {
  return (
    <Box sx={{ mt: 12 }}>
      <Typography sx={MainStyles.TypoGraphy}>
        <span style={{ color: "#FF814D", fontWeight: 600 }}>
          {" "}
          {selectdChip}
        </span>{" "}
        에 관심있는 회사는 여기에요!
      </Typography>
      <Grid container spacing={{ xs: 2, md: 2 }}>
        {data.map((item, index) => (
          <Grid item xs={4} sm={4} md={4} key={index}>
            <CompanyCard name={item.name} content={item.content} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CompanySection;