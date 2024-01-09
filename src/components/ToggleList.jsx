import React, { useState, useEffect } from "react";
import { Collapse, Typography, Box, IconButton } from "@mui/material";
import vector from "../assets/images/vector.svg";

export default function ToggleList() {
  const [lists, setLists] = useState([]);
  const [showItem, setShowItem] = useState({});
  const [content, setContent] = useState({});

  useEffect(() => {
    // 여기에 FAQ 데이터를 불러오는 비동기 함수를 작성해야함
    const fetchFaqData = async () => {
      const mockData = [
        { id: 1, title: "FAQ", content: "FAQ 1의 내용입니다." },
        {
          id: 2,
          title: "개인정보 수집 및 이용",
          content:
            "국가의 세입·세출의 결산, 국가 및 법률이 정한 단체의 회계검사와 행정기관 및 공무원의 직무에 관한 감찰을 하기 위하여 대통령 소속하에 감사원을 둔다. 선거에 관한 경비는 법률이 정하는 경우를 제외하고는 정당 또는 후보자에게 부담시킬 수 없다. 법관이 중대한 심신상의 장해로 직무를 수행할 수 없을 때에는 법률이 정하는 바에 의하여 퇴직하게 할 수 있다.국가는 모성의 보호를 위하여 노력하여야 한다. 국회의원은 법률이 정하는 직을 겸할 수 없다. 국무위원은 국정에 관하여 대통령을 보좌하며, 국무회의의 구성원으로서 국정을 심의한다. 대통령은 전시·사변 또는 이에 준하는 국가비상사태에 있어서 병력으로써 군사상의 필요에 응하거나 공공의 안녕질서를 유지할 필요가 있을 때에는 법률이 정하는 바에 의하여 계엄을 선포할 수 있다.",
        },
        {
          id: 3,
          title: "서비스 이용 약관",
          content:
            "국가의 세입·세출의 결산, 국가 및 법률이 정한 단체의 회계검사와 행정기관 및 공무원의 직무에 관한 감찰을 하기 위하여 대통령 소속하에 감사원을 둔다. 선거에 관한 경비는 법률이 정하는 경우를 제외하고는 정당 또는 후보자에게 부담시킬 수 없다. 법관이 중대한 심신상의 장해로 직무를 수행할 수 없을 때에는 법률이 정하는 바에 의하여 퇴직하게 할 수 있다.국가는 모성의 보호를 위하여 노력하여야 한다. 국회의원은 법률이 정하는 직을 겸할 수 없다. 국무위원은 국정에 관하여 대통령을 보좌하며, 국무회의의 구성원으로서 국정을 심의한다. 대통령은 전시·사변 또는 이에 준하는 국가비상사태에 있어서 병력으로써 군사상의 필요에 응하거나 공공의 안녕질서를 유지할 필요가 있을 때에는 법률이 정하는 바에 의하여 계엄을 선포할 수 있다.",
        },
      ];

      setLists(mockData);
    };

    fetchFaqData();
  }, []);

  const toggleItem = (id) => () => {
    setShowItem((prevShowItem) => ({
      ...prevShowItem,
      [id]: !prevShowItem[id],
    }));

    // FAQ를 클릭할 때 해당 FAQ의 내용을 불러오는 로직 추가
    const selectedList = lists.find((list) => list.id === id);
    if (selectedList) {
      setContent({ ...content, [id]: selectedList.content });
    }
  };

  return (
    <div style={{ marginTop: 42 }}>
      {lists.map((list) => (
        <div key={list.id}>
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            onClick={toggleItem(list.id)}
            style={{
              cursor: "pointer",
              paddingBottom: 32,
              paddingLeft: "16px",
            }}
          >
            <IconButton size="small">
              <img src={vector} />
            </IconButton>

            <Typography component="h2" sx={{ fontSize: "16px" }}>
              {list.title}
            </Typography>
          </Box>
          <Collapse in={showItem[list.id]}>
            <Typography marginLeft={7} marginBottom={2}>
              {content[list.id]}
            </Typography>
          </Collapse>
        </div>
      ))}
    </div>
  );
}
