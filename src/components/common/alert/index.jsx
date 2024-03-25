import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { alertState } from 'recoil/atoms';

export default function AlertComponent({ alertTitle, alertContent, alertNavigate }) {
  const navigate = useNavigate();

  const [open, setOpen] = useRecoilState(alertState);

  const handleClose = (route) => {
    navigate(route);
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{alertTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{alertContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(alertNavigate)} autoFocus>
            확인
          </Button>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
