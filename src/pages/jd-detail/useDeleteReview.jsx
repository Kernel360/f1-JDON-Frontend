import { delReivew } from "api/api";

export function useDeleteReview(setReviewNum, fetchReviewData) {
  const deleteReviewAndUpdate = async (reviewId) => {
    await delReivew(reviewId);
    alert("리뷰가 정상적으로 삭제되었습니다");
    setReviewNum((prev) => prev - 1);
    fetchReviewData(true);
  };

  return { deleteReviewAndUpdate };
}
