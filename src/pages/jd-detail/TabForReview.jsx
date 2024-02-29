import { Box } from "@mui/material";
import { theme } from "../../styles/themeMuiStyle";
import { ReviewItem } from "./ReviewItem";
import add from "../../assets/icons/review_add.svg";
import { useCallback, useEffect, useState } from "react";
import { addReivew, delReivew, getReivew } from "../../api/api";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../../recoil/atoms";
import { ReviewPopup } from "./ReviewPopup";
import { usePopup } from "../../components/common/usePopup";

export function TabForReview({ id, setReviewNum }) {
  const { isOpen, openPopup, closePopup } = usePopup();
  const loginState = useRecoilValue(isLoggedInState);
  const [reviewData, setReviewData] = useState({ content: [], pageInfo: {} });

  const fetchReviewData = async (page) => {
    try {
      const res = await getReivew(id, page);
      setReviewData({
        content: [...res.content],
        pageInfo: res.pageInfo,
      });
    } catch (error) {
      console.error("Failed to fetch review data:", error);
    }
  };

  const handleScroll = useCallback(() => {
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    )
      return;
    if (!reviewData.pageInfo.last) {
      fetchReviewData(reviewData.pageInfo.pageNumber + 1);
    }
  }, [reviewData.pageInfo]);

  useEffect(() => {
    fetchReviewData(0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const addReviewAndUpdate = async (newReview) => {
    await addReivew({ jdId: Number(id), content: newReview.content });
    fetchReviewData(0);
    alert("리뷰가 등록되었습니다");
    setReviewNum((prev) => prev + 1);
    closePopup();
  };

  const deleteReviewAndUpdate = async (reviewId) => {
    await delReivew(reviewId);
    fetchReviewData(0);
    alert("리뷰가 정상적으로 삭제되었습니다");
    setReviewNum((prev) => prev - 1);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "right",
        }}
      >
        <ReviewPopup
          id={id}
          isOpen={isOpen}
          closePopup={closePopup}
          addReviewAndUpdate={addReviewAndUpdate}
        />
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
          deleteReviewAndUpdate={deleteReviewAndUpdate}
        />
      ))}
    </>
  );
}
