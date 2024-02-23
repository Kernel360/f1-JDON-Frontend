import { Box } from "@mui/material";
import { theme } from "../../styles/themeMuiStyle";
import { ReviewItem } from "./ReviewItem";
import add from "../../assets/icons/review_add.svg";

export function TabForReview({ reviewData, openPopup }) {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",

          justifyContent: "right",
        }}
      >
        <Box
          sx={{
            cursor: "potiner",
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
      </Box>
      {reviewData.map((item) => (
        <ReviewItem review={item} reviewData={reviewData} />
      ))}
    </>
  );
}
