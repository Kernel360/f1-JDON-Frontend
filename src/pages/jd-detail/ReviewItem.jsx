import { Box, Typography } from "@mui/material";

export function ReviewItem({ review, isWritter, deleteReviewAndUpdate }) {
  const deleteReivew = async () => {
    try {
      await deleteReviewAndUpdate(review.id);
    } catch (error) {
      const { message } = error.response.data;
      alert(message);
      return;
    }
  };

  return (
    <Box sx={{ borderBottom: "1px solid #EBEBEB", py: 2 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography
          variant="body3"
          component="p"
          color="#9A9AA1"
          fontSize={12}
          fontWeight={600}
          mb={1}
        >
          {review.nickname}
        </Typography>
        <Typography
          variant="body3"
          component="p"
          color="#9A9AA1"
          fontSize={12}
          mb={2}
        >
          {review.createdDate}
        </Typography>
      </Box>
      <Typography variant="body3" component="p" color="#545459" fontSize={14}>
        {review.content}
      </Typography>
      {isWritter && (
        <Box
          sx={{
            display: "flex",
            pt: 2,
            width: "100%",
            justifyContent: "right",
          }}
        >
          <CommonButton title="삭제" onClick={deleteReivew} />
        </Box>
      )}
    </Box>
  );
}

function CommonButton({ title, onClick, styles }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles,
        border: "none",
        borderRadius: "999px",
        fontSize: "12px",
        padding: "4px 10px",
        background: "black",
        color: "white",
        fontWeight: 600,
      }}
    >
      {title}
    </button>
  );
}
