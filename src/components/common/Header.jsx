import { Box, Typography } from "@mui/material";
import back from "../../assets/icons/btn_back.svg";

function Header({ title }) {
  const goBackHandler = () => {
    window.history.back();
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Box
          onClick={goBackHandler}
          sx={{ py: 3, display: "flex", gap: 2, cursor: "pointer" }}
        >
          <img src={back} alt="백" />
          <Typography fontSize="1rem" fontWeight={400}>
            {title}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
export default Header;
