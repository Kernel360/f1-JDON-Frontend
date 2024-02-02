import { Box, Grid, Typography } from "@mui/material";
import CompanyCard from "../../components/common/card/CompanyCard";
import { MainStyles } from "../PageStyles";

function CompanySection({ selectdChip, data }) {
  return (
    <Box sx={{ mt: 12 }}>
      <Typography sx={MainStyles.TypoGraphy}>
        {/* Typography 내부에 span 사용시 불필요한 중괄호 제거 */}
        <span style={{ color: "black", fontWeight: 600, margin: "2px 8px" }}>
          {selectdChip.keyword}
        </span>
        에 관심있는 회사에요!
      </Typography>
      <Box sx={{ width: "100%" }}>
        {data.length > 0 ? (
          <Grid container spacing={{ xs: 1, sm: 2, md: 2 }} sx={{ py: 1 }}>
            {data.map((item, index) => (
              <Grid item xs={6} sm={4} md={4} key={index}>
                <CompanyCard data={item} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              padding: "100px 0",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                color: "#B9B9B9",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              회사 데이터가 존재하지 않습니다
            </div>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default CompanySection;
