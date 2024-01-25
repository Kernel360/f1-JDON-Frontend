import React, { useState } from "react";
import { Collapse, Typography, Box, IconButton } from "@mui/material";
import vector from "../../assets/images/vector.svg";

const ToggleList = ({ datas }) => {
  // 재귀적인 데이터 구조
  console.log("check", datas);
  return (
    <div style={{ marginTop: 42, backgroundcolor: "pink" }}>
      {datas.map((data) => (
        <FAQItem key={data.id} {...data} />
      ))}
    </div>
  );
};

const FAQItem = ({ id, title, content, children }) => {
  const [showItem, setShowItem] = useState(false);

  const toggleItem = () => {
    setShowItem((prevShowItem) => !prevShowItem);
  };

  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        onClick={toggleItem}
        style={{
          cursor: "pointer",
          paddingBottom: 32,
          paddingLeft: "16px",
          // marginBottom: "20px",
        }}
      >
        <IconButton size="small">
          <img src={vector} alt="vector" />
        </IconButton>
        <Typography
          component="h2"
          sx={{
            fontSize: "16px",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Collapse in={showItem}>
        <Typography marginLeft={7} marginBottom={2}>
          {content}
        </Typography>
        {children && (
          <div
            style={{
              paddingLeft: "20px",
              borderBottom: "1px solid #f0f0f0",
              marginBottom: "20px",
            }}
          >
            {children.map((child, index) => (
              <FAQItem key={child.id} {...child} />
            ))}
          </div>
        )}
      </Collapse>
    </div>
  );
};

export default ToggleList;
