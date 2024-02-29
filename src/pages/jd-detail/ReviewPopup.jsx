import { useState } from "react";
import { BackDrop } from "../../components/common/BackDrop";
import NewInput from "../../components/common/new-input/NewInput";
import { Box } from "@mui/material";
import NewBtn from "../../components/common/new-btn/NewBtn";
import { PopupFrame } from "../../components/common/PopupFrame";

export function ReviewPopup({ id, isOpen, closePopup, addReviewAndUpdate }) {
  const [reviewInput, setReviewInput] = useState();

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  const handleAddReview = async () => {
    const newReview = {
      content: reviewInput,
    };
    await addReviewAndUpdate(newReview);
    setReviewInput("");
  };

  return (
    <BackDrop onClick={handleClose} isVisible={isOpen}>
      <PopupFrame>
        <Box sx={{ width: "90%", margin: "0 auto", py: 5 }}>
          <NewInput
            type="text"
            isMultiline={true}
            value={reviewInput}
            placeholder="리뷰를 입력해주세요"
            label="리뷰를 남겨주세요!"
            onChange={(e) => setReviewInput(e.target.value)}
          />
          <NewBtn
            title="등록하기"
            onClick={handleAddReview}
            isActive={reviewInput}
          />
        </Box>
      </PopupFrame>
    </BackDrop>
  );
}
