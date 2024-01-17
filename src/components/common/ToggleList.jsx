import React, { useState } from "react";
import { Collapse, Typography, Box, IconButton } from "@mui/material";
import vector from "../../assets/images/vector.svg";

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
              <FAQItem
                key={child.id}
                {...child}
                style={{
                  // borderBottom: "none",
                  width: "100%",
                }}
              />
            ))}
          </div>
        )}
      </Collapse>
    </div>
  );
};

const ToggleList = () => {
  // 재귀적인 데이터 구조
  const faqData = [
    {
      id: 1,
      title: "FAQ",
      // content: "FAQ 1의 내용입니다.",
      children: [
        {
          id: 4,
          title: "FAQ 하위 1",
          content: "FAQ 하위 1의 내용입니다.",
        },
        {
          id: 5,
          title: "FAQ 하위 2",
          content: "FAQ 하위 2의 내용입니다.",
        },
      ],
    },
    {
      id: 2,
      title: "개인정보 수집 및 이용",
      children: [
        {
          id: 6,
          title: "개인정보 하위 1",
          content: "개인정보 하위 1의 내용입니다.",
        },
        {
          id: 7,
          title: "개인정보 하위 2",
          content: "개인정보 하위 2의 내용입니다.",
        },
      ],
    },
    {
      id: 3,
      title: "서비스 이용 약관",
      children: [
        {
          id: 8,
          title: "서비스 하위 1",
          content: "서비스 하위 1의 내용입니다.",
        },
        {
          id: 9,
          title: "서비스 하위 2",
          content: "서비스 하위 2의 내용입니다.",
        },
      ],
    },
  ];

  return (
    <div style={{ marginTop: 42, backgroundcolor: "pink" }}>
      {faqData.map((faq) => (
        <FAQItem key={faq.id} {...faq} />
      ))}
    </div>
  );
};

export default ToggleList;
