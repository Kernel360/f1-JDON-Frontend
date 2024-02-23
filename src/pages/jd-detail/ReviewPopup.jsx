import { useState } from "react";
import { PopupFrame } from "./PopupFrame";
import { BackDrop } from "../../components/common/BackDrop";
import NewInput from "../../components/common/new-input/NewInput";
import { Box } from "@mui/material";
import NewBtn from "../../components/common/new-btn/NewBtn";

export function ReviewPopup({ isOpen, closePopup, reviewData }) {
  const [review, setReview] = useState();

  const handleClose = (e) => {
    if (e.target === e.currentTarget) closePopup();
  };

  const addReview = () => {
    // reviewData.push(review);
    alert("리뷰가 등록되었습니다");
  };
  return (
    <>
      {isOpen && (
        <BackDrop onClick={handleClose} isVisible={isOpen}>
          <PopupFrame>
            <Box sx={{ width: "90%", margin: "0 auto", py: 5 }}>
              <NewInput
                type="text"
                isMultiline={true}
                value={review}
                placeholder="리뷰를 입력해주세요"
                label="리뷰를 남겨주세요!"
                onChange={(e) => setReview(e.target.value)}
              />
              <NewBtn title="등록하기" onClick={addReview} />
            </Box>
          </PopupFrame>
        </BackDrop>
      )}
    </>
  );
}
