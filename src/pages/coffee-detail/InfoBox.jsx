import { Box } from "@mui/material";

function InfoBox() {
  return (
    <Box
      sx={{
        borderRadius: "10px",
        width: "100%",
        heigth: "64px",
        background: "#F2F2F2",
        my: "24px",
        py: "20px",
        px: "16px",
      }}
    >
      <Box
        sx={{
          pb: "12px",
          color: "#545459",
          fontWeight: "700",
          fontSize: "12px",
        }}
      >
        모집정보
      </Box>
      <Box
        sx={{
          pb: "5px",
          color: "#545459",
          fontSize: "12px",
        }}
      >
        일시:{" "}
      </Box>
      <Box
        sx={{
          pb: "5px",
          color: "#545459",
          fontSize: "12px",
        }}
      >
        인원:{" "}
      </Box>
    </Box>
  );
}

export default InfoBox;
