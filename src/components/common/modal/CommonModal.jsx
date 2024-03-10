import { Box, Modal } from "@mui/material";

function CommonModal({ open, onClose, children }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 328,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 4,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
}
export default CommonModal;
