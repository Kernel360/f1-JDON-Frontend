import { Button } from "@mui/material";

function NewBtn({ title, onClick }) {
  return (
    <Button
      type="submit"
      fullWidth
      sx={{
        mt: 5,
        mb: 2,
        p: "13px",
        borderRadius: "999px",
        background: "#EBEBEB",
        color: "#BCBCC4",
        fontSize: "16px",
        "&:hover": {
          color: "#ffffff",
        },
      }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
}
export default NewBtn;
