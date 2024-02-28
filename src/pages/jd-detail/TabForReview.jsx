import { Box } from "@mui/material";
import { theme } from "../../styles/themeMuiStyle";
import { ReviewItem } from "./ReviewItem";
import add from "../../assets/icons/review_add.svg";
import { useCallback, useEffect, useState } from "react";
import { getReivew } from "../../api/api";

export function TabForReview({ id, openPopup }) {
  const [reviewData, setReviewData] = useState({ content: [], pageInfo: {} });
  const [isLoading, setIsLoading] = useState(false);
  // 데이터 불러오는 함수
  const fetchReviewData = async (page) => {
    setIsLoading(true);
    try {
      const res = await getReivew(id, page); // getReview 함수가 페이지 번호를 인자로 받도록 수정 필요
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

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    )
      return;
    if (!reviewData.pageInfo.last) {
      fetchReviewData(reviewData.pageInfo.pageNumber + 1);
    }
  }, [isLoading, reviewData.pageInfo]);

  useEffect(() => {
    fetchReviewData(0); // 초기 데이터 로드
  }, [id]);

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
        <ReviewItem review={item} reviewData={reviewData} />
      ))}
    </>
  );
}
