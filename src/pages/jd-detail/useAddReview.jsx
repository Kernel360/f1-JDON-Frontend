import { addReivew } from "../../api/api";

export function useAddReview(id, setReviewNum, fetchReviewData, closePopup) {
  const addReviewAndUpdate = async (newReview) => {
    await addReivew({ jdId: Number(id), content: newReview.content });
    alert("리뷰가 등록되었습니다");
    setReviewNum((prev) => prev + 1);
    fetchReviewData(true);
    closePopup();
  };

  return { addReviewAndUpdate };
}
