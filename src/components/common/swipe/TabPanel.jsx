import React from "react";
import { Box } from "@mui/material";

export default function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <Box sx={{ maxHeight: "100%", overflowY: "auto" }}>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
      >
        {value === index && <Box sx={{ pl: 3, width: "100%" }}>{children}</Box>}
      </div>
    </Box>
  );
}
