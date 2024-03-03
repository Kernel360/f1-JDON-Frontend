import { Box } from "@mui/material";
import { theme } from "../../styles/themeMuiStyle";
import add from "../../assets/icons/review_add.svg";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../../recoil/atoms";

export const AddReviewButton = ({ openPopup }) => {
  const loginState = useRecoilValue(isLoggedInState);
  console.log(loginState);
  return (
    <Box
      sx={{
        cursor: "pointer",
        background: theme.palette.primary.main,
        p: 2,
        borderRadius: "8px",
        width: "8px",
        height: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={openPopup}
    >
      <img src={add} alt="add" />
    </Box>
  );
};
