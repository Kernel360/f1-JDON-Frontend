import { Box } from "@mui/material";
import { theme } from "../../styles/themeMuiStyle";
import { ReviewItem } from "./ReviewItem";
import add from "../../assets/icons/review_add.svg";
import { useCallback, useEffect, useState } from "react";
import { getReivew } from "../../api/api";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../../recoil/atoms";

export function TabForReview({ id, openPopup }) {
  const loginState = useRecoilValue(isLoggedInState);
  const [reviewData, setReviewData] = useState({ content: [], pageInfo: {} });
  const [isLoading, setIsLoading] = useState(false);

  const fetchReviewData = async (page) => {
    setIsLoading(true);
    try {
      const res = await getReivew(id, page);
      setReviewData((prev) => ({
        content: [...prev.content, ...res.content],
        pageInfo: res.pageInfo,
      }));
    } catch (error) {
      console.error("Failed to fetch review data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = useCallback(() => {
    console.log(window.innerHeight + document.documentElement.scrollTop);
    if (
      window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight ||
      isLoading
    )
      return;
    if (!reviewData.pageInfo.last) {
      fetchReviewData(reviewData.pageInfo.pageNumber + 1);
    }
  }, [isLoading, reviewData.pageInfo]);

  useEffect(() => {
    fetchReviewData(0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
      {reviewData.content.map((item) => (
        <ReviewItem
          review={item}
          isWritter={loginState.memberId === item.memberId}
          reviewData={reviewData}
          loginUser={loginState.loginUser}
        />
      ))}
    </>
  );
}
