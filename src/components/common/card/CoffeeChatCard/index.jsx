import * as React from "react";

import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { cardStyles } from "./CoffeeChatCardStyle";
import CardBody from "./CardBody";
import CardHeader from "./CardHeader";

function CoffeeChatCard({ data, kindOfJd }) {
  const navigate = useNavigate();

  const jobNum = useMemo(
    () => kindOfJd?.find((jd) => jd.name === data.job)?.id,
    [kindOfJd, data.job]
  );

  const handleClick = () => {
    if (data.activeStatus === "모집종료") {
      alert("종료된 커피챗입니다");
      return;
    }
    navigate(`/coffee/${data.coffeeChatId}`);
  };

  return (
    <Paper onClick={handleClick} elevation={0} sx={cardStyles(data)}>
      <CardHeader jobNum={jobNum} data={data} />
      <CardBody data={data} />
    </Paper>
  );
}

export default CoffeeChatCard;