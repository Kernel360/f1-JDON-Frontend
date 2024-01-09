import React from "react";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

import backBtn from "../../assets/images/back_button.svg";

export default function Header({ showBackButton, myText }) {
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery("(min-width:600px)");

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "white",
        color: "black",
        boxShadow: "none",
        paddingY: "8px",
      }}
    >
      <Box sx={{ display: "flex", gap: "2" }}>
        {showBackButton && (
          <IconButton color="inherit" onClick={handleBack}>
            <img
              src={backBtn}
              alt="back"
              style={{ width: "24px", height: "24px" }}
            ></img>
          </IconButton>
        )}
        <Typography
          variant="h1"
          style={{
            fontSize: showBackButton ? "1.5rem" : "1rem",
            fontWeight: showBackButton ? "600" : "400",
            margin: showBackButton ? "0.5rem 0 0.5rem 0" : "0 auto",
          }}
        >
          {myText}
        </Typography>
      </Box>
    </AppBar>
  );
}
