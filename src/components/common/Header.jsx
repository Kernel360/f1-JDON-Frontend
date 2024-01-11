import { Box, Typography } from "@mui/material";
import back from "../../assets/icons/btn_back.svg";

function Header({ title }) {
  const goBackHandler = () => {
    window.history.back();
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Box onClick={goBackHandler} sx={{ py: 3 }}>
          <img src={back} alt="백" />
        </Box>
        <Typography fontSize="1rem" fontWeight={400}>
          {title}
        </Typography>
      </Box>
    </>
  );
}
export default Header;
