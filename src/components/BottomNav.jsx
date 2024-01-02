import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Paper } from "@mui/material";
import { Coffee, Home, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BottomNav() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  //console.log("out" + value);
  useEffect(() => {
    // console.log("in" + value);
    if (value === 0) navigate("../main");
    else if (value === 1) navigate("../coffee");
    else if (value === 2) navigate("../mypage"); // 마이페이지로 이동하는 로직 추가
  });

  return (
    <Paper
      sx={{
        maxWidth: "1000px",
        width: "100%",
        position: "fixed",
        bottom: 0,
        right: 0,
        height: "70px",
        left: "50%", // 화면 중앙에 위치
        transform: "translateX(-50%)", // 정확한 중앙 정렬을 위한 변환
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ height: "70px" }}
      >
        <BottomNavigationAction label="메인" icon={<Home />} />
        <BottomNavigationAction label="커피챗" icon={<Coffee />} />
        <BottomNavigationAction label="마이페이지" icon={<Person />} />
      </BottomNavigation>
    </Paper>
  );
}
