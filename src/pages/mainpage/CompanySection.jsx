import { Box, Button, Grid, Typography } from "@mui/material";
import CompanyCard from "../../components/common/card/CompanyCard";
import { MainStyles } from "../PageStyles";
import { useNavigate } from "react-router-dom";

function CompanySection({ selectedChip, data }) {
  const navigate = useNavigate();

  const pageHandler = () => {
    navigate("/jd")
  }
  return (
    <Box sx={{ mt: 8 }}>
      <Typography sx={MainStyles.JDTypoGraphy}>
        {/* Typography 내부에 span 사용시 불필요한 중괄호 제거 */}
        <p>
          <span
            style={{
              color: "black",
              fontWeight: 700,
              marginRight: 7,
              fontSize: "18px",
            }}
          >
            {selectedChip.keyword}
          </span>
          에 관심있는 회사에요!
        </p>
        <Button variant="outlined" onClick={pageHandler}>더 보기</Button>
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
