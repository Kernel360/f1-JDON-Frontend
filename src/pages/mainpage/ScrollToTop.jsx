import { Box } from "@mui/material";
import topIcon from "./../../assets/icons/aroww-top.svg";

function SrcollToTop({ topRef }) {
  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      maxWidth="md"
      sx={{
        position: "fixed",
        width: "92%",
        height: "40px",
        bottom: 100,
        textAlign: "right",
      }}
    >
      <button
        onClick={scrollToTop}
        style={{
          padding: 8,
          border: "none",
          borderRadius: "999px",
          width: 48,
          height: 48,
          cursor: "pointer",
          zIndex: 1000,
          background: "white",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <img src={topIcon} alt="위로가기" />
      </button>
    </Box>
  );
}

export default SrcollToTop;
