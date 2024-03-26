import { Box } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/atoms';
import { ReviewPopup } from './ReviewPopup';
import { usePopup } from 'components/common/pop-up/usePopup';
import { useReviewPagination } from './useReviewPagination';
import { useAddReview } from './useAddReview';
import { useDeleteReview } from './useDeleteReview';
import { AddReviewButton } from './addReviewButton';
import { ReviewList } from './ReviewList';

export function TabForReview({ id, setReviewNum }) {
  const { isOpen, openPopup, closePopup } = usePopup();
  const loginState = useRecoilValue(isLoggedInState);
  const { isLoading, reviewData, ref, fetchReviewData } = useReviewPagination(id);

  const { addReviewAndUpdate } = useAddReview(id, setReviewNum, fetchReviewData, closePopup);

  const { deleteReviewAndUpdate } = useDeleteReview(setReviewNum, fetchReviewData);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'right',
        }}>
        <ReviewPopup
          id={id}
          isOpen={isOpen}
          closePopup={closePopup}
          addReviewAndUpdate={addReviewAndUpdate}
        />
        <AddReviewButton openPopup={openPopup} />
      </Box>
      <ReviewList
        reviewData={reviewData}
        deleteReviewAndUpdate={deleteReviewAndUpdate}
        loginState={loginState}
      />
      {isLoading && <div>Loading...</div>}
      <div ref={ref}></div>
    </>
  );
}
