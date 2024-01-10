import { Box } from "@mui/material";
import back from "../../assets/icons/btn_back.svg";

function Header() {
  const goBackHandler = () => {
    window.history.back();
  };
  return (
    <>
      <Box onClick={goBackHandler} sx={{ py: 3 }}>
        <img src={back} alt="백" />
      </Box>
    </>
  );
}
export default Header;
