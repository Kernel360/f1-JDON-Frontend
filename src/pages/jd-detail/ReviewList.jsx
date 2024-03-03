import { ReviewItem } from "./ReviewItem";

export const ReviewList = ({
  reviewData,
  deleteReviewAndUpdate,
  loginState,
}) => {
  return (
    <>
      {reviewData.map((item) => (
        <ReviewItem
          key={item.id}
          review={item}
          isWritter={loginState.memberId === item.memberId}
          reviewData={reviewData}
          loginUser={loginState.loginUser}
          deleteReviewAndUpdate={deleteReviewAndUpdate}
        />
      ))}
    </>
  );
};
