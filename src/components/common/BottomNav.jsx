import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Paper } from "@mui/material";
import { Coffee, Home, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BottomNav() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleNavigationChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/coffee");
        break;
      case 2:
        navigate("/mypage");
        break;
      default:
        break;
    }
  };

  return (
    <Paper
      sx={{
        maxWidth: "1000px",
        width: "100%",
        position: "fixed",
        bottom: 0,
        right: 0,
        height: "70px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <BottomNavigation
        showLabels
        onChange={handleNavigationChange}
        sx={{ height: "70px" }}
      >
        <BottomNavigationAction label="메인" icon={<Home />} />
        <BottomNavigationAction label="커피챗" icon={<Coffee />} />
        <BottomNavigationAction label="마이페이지" icon={<Person />} />
      </BottomNavigation>
    </Paper>
  );
}
