import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import backBtn from "../../assets/images/back_button.svg";

export default function Header({ showBackButton, myText }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <AppBar
      position="static"
      style={{ background: "white", color: "black", boxShadow: "none" }}
    >
      <Toolbar>
        {showBackButton && (
          <IconButton color="inherit" onClick={handleBack}>
            <img
              src={backBtn}
              alt="back"
              style={{ width: "1.5rem", height: "1.5rem" }}
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
      </Toolbar>
    </AppBar>
  );
}
