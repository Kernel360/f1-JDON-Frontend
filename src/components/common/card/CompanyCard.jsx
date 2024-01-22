import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Paper } from "@mui/material";
import company1 from "./../../../assets/images/comany1.svg";
import company2 from "./../../../assets/images/company2.svg";
import company3 from "./../../../assets/images/company3.svg";
import { CompanyCardStyle } from "./CardStyle";

export default function CompanyCard({ data }) {
  return (
    <Paper elevation={0} sx={{ my: 1 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={data.imageUrl || company1}
          sx={{ height: 200, borderRadius: "5px" }}
        />
        <Box sx={{ mt: 1 }}>
          <Typography
            variant="body3"
            component="div"
            color="#9A9AA1"
            sx={CompanyCardStyle.Name}
          >
            {data.company}
          </Typography>
          <Typography color="#545459" fontSize="14px" fontWeight="500">
            {data.title}
          </Typography>
        </Box>
      </CardActionArea>
    </Paper>
  );
}
