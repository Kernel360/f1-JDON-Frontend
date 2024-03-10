import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function DetailDialog({ open, handleClose, title, content }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DetailDialog;
