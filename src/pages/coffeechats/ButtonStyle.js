export const buttonStyles = {
  Container: {
    position: "relative",
    width: "100%",
    flexGrow: 1,
    "& .MuiContainer-root": {
      padding: 0,
      width: "100%",
      gap: 10,
      flexGrow: 1,
    },
  },

  Button: {
    mt: 5,
    mb: 2,
    py: "13px",
    borderRadius: "999px",
    background: "#EBEBEB",
    color: "#BCBCC4",
    fontSize: "16px",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#6482FF",
    },
  },
  ShareButton: {
    mt: 5,
    mb: 2,
    py: "13px",
    borderRadius: "10px",
    background: "white",
    border: "1px solid #6482FF",
    fontSize: "16px",
    width: "100%",
  },

  UpTitle: {
    px: "6px",
    paddingTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
