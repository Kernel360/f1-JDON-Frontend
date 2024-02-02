import React, { useState } from "react";
import {
  Container,
  Collapse,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import vector from "../../assets/images/vector.svg";

const ToggleList = ({ datas }) => {
  console.log("data", datas);
  return (
    <div style={{ marginTop: 42 }}>
      {datas.map((data) => (
        <TitleItem key={data.id} {...data} />
      ))}
    </div>
  );
};
const TitleItem = ({ title, content, children }) => {
  const [showItem, setShowItem] = useState(false);

  const toggleItem = () => {
    setShowItem((prevShowItem) => !prevShowItem);
  };

  return (
    <Container sx={{ marginBottom: 3, width: "100%", padding: 0 }}>
      <Box
        display="flex"
        alignItems="center"
        gap={3}
        onClick={toggleItem}
        style={{
          cursor: "pointer",
          paddingBottom: 11,
        }}
      >
        <IconButton size="small">
          <img src={vector} alt="vector" />
        </IconButton>
        <Typography
          component="h2"
          sx={{
            fontSize: "18px",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Collapse in={showItem}>
        <Box
          sx={{
            marginLeft: "50px",
            border: "1.5px solid #E2E7FF",
            borderRadius: "5px",
            overflowY: "auto",
            overflowX: "hidden",
            maxHeight: "200px",
          }}
        >
          <Typography marginLeft={7} marginBottom={2}>
            {content}
          </Typography>
          {children && (
            <Box>
              {children.map((child, index) => (
                <TextItem key={index} {...child} />
              ))}
            </Box>
          )}
        </Box>
      </Collapse>
    </Container>
  );
};
const TextItem = ({ title, content }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        padding: "0px 15px 15px 35px",
      }}
    >
      <Typography
        component="h6"
        sx={{
          fontSize: "14px",
          fontWeight: "bold",
          marginBottom: "4px",
        }}
      >
        {title}
      </Typography>
      <Typography
        // key={index}
        component="p"
        sx={{
          fontSize: "14px",
          paddingLeft: "15px",
          lineHeight: "1.6",
          color: "#333",
          whiteSpace: "pre-line",
        }}
      >
        {content}
      </Typography>
    </Box>
  );
};

export default ToggleList;
