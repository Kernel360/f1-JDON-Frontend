import { useState } from 'react';
import { BackDrop } from 'components/common/BackDrop';
import NewInput from 'components/common/new-input/NewInput';
import { Box } from '@mui/material';
import NewBtn from 'components/common/new-btn/NewBtn';
import { PopupFrame } from 'components/common/PopupFrame';

export function ReviewPopup({ isOpen, closePopup, addReviewAndUpdate }) {
  const [reviewInput, setReviewInput] = useState();
  const [helperText, setHelperText] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  const handleAddReview = async () => {
    if (!isValid) return;
    const newReview = {
      content: reviewInput,
    };
    await addReviewAndUpdate(newReview);
    setReviewInput('');
  };

  const checkValidation = (value) => {
    if (value.length < 10 || value.length > 500) {
      setHelperText('내용은 10자 이상 500자 이하로 작성해주세요');
      setIsValid(false);
    } else {
      setHelperText('');
      setIsValid(true);
    }
    setReviewInput(value);
  };

  return (
    <BackDrop onClick={handleClose} isVisible={isOpen}>
      <PopupFrame>
        <Box sx={{ width: '90%', margin: '0 auto', py: 5 }}>
          <NewInput
            type="text"
            helperText={helperText}
            isMultiline={true}
            value={reviewInput}
            placeholder="리뷰를 입력해주세요"
            label="리뷰를 남겨주세요!"
            onChange={(e) => checkValidation(e.target.value)}
          />
          <NewBtn
            title="등록하기"
            disable={!isValid}
            onClick={handleAddReview}
            isActive={isValid}
          />
        </Box>
      </PopupFrame>
    </BackDrop>
  );
}
