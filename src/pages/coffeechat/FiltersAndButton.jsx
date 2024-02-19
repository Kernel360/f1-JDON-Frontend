import { Box, Button } from "@mui/material";
import { Filters } from "../../components/common/filters/Filters";
import { useNavigate } from "react-router-dom";

function FiltersAndButton({ sortData, kindOfJd, onChange }) {
  const navigate = useNavigate();
  const login = localStorage.getItem("isLoggedInState");

  const handleConfirm = () => {
    if (
      window.confirm(
        "[커피챗 오픈]은 로그인 후에 확인 하실 수 있습니다. 로그인페이지로 이동하시겠습니까?"
      )
    ) {
      navigate("/signin");
    }
  };

  const handleOpenCoffee = () => {
    if (login === "false") {
      handleConfirm();
      return;
    } else {
      navigate("/coffeechat-open");
    }
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={0.5}
    >
      <Filters sortData={sortData} onChange={onChange} kindOfJd={kindOfJd} />
      <Button
        variant="contained"
        disableElevation
        sx={{
          fontWeight: 600,
          fontSize: 12,
          padding: "4px 10px",
          gap: 1,
        }}
        onClick={handleOpenCoffee}
      >
        + New
      </Button>
    </Box>
  );
}

export default FiltersAndButton;