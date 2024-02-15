import { Box, Button, Grid } from "@mui/material";
import { buttonStyles } from "./ButtonStyle";
import ShareIcon from "@mui/icons-material/Share";
import NewBtn from "../../components/common/new-btn/NewBtn";
import { theme } from "../../styles/themeMuiStyle";
import { useNavigate } from "react-router-dom";
import { applyCoffeechat, deleteCoffeechat } from "../../api/api";
import { useEffect, useState } from "react";

function CoffeeDetailButtons({ id, host, coffeeChatData }) {
  const navigate = useNavigate();
  const [applyCoffee, setApplyCoffee] = useState({});
  const [alreadyApplied, setAlreadyApplyed] = useState(false);

  const applyForCoffeeChat = async () => {
    try {
      await applyCoffeechat(id, applyCoffee);
      if (
        window.confirm(
          "신청이 완료되었습니다. 커피챗 신청 내역을 확인하시겠습니까?"
        )
      ) {
        navigate("/mypage");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setAlreadyApplyed(true);
        alert("이미 신청된 커피챗입니다.");
      } else {
        console.error("신청 중 에러가 발생했습니다.", error);
      }
    }
  };
  const editCoffeeChat = async () => {
    navigate(`/edit-coffee/${id}`);
  };

  const removeCoffeeChat = async () => {
    try {
      await deleteCoffeechat(id, applyCoffee);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCoffeeChatData = async () => {
      setApplyCoffee({
        title: coffeeChatData.title,
        content: coffeeChatData.content,
        totalRecruitCount: coffeeChatData.totalRecruitCount,
        meetDate: coffeeChatData.meetDate,
        openChatUrl: coffeeChatData.openChatUrl,
      });
    };
    fetchCoffeeChatData();
  }, [id, coffeeChatData]);

  const copyUrlToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL이 클립보드에 복사되었습니다.");
      })
      .catch((err) => {
        console.error("URL 복사에 실패했습니다.", err);
      });
  };

  return (
    <Box sx={buttonStyles.Container}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={9}
          sm={9}
          fullwidth
          sx={{ display: "flex", gap: "12px" }}
        >
          {host ? (
            <>
              <NewBtn
                title="수정하기"
                styles={{
                  background: theme.palette.primary.main,
                  color: "white",
                }}
                onClick={editCoffeeChat}
              ></NewBtn>
              <NewBtn
                title="삭제하기"
                styles={{
                  background: theme.palette.primary.main,
                  color: "white",
                }}
                onClick={removeCoffeeChat}
              ></NewBtn>
            </>
          ) : (
            <NewBtn
              title="신청하기"
              onClick={applyForCoffeeChat}
              styles={{
                background: theme.palette.primary.main,
                color: "white",
              }}
            ></NewBtn>
          )}
        </Grid>
        <Grid item xs={3} sm={3}>
          <Button sx={buttonStyles.ShareButton} onClick={copyUrlToClipboard}>
            <ShareIcon sx={{ color: theme.palette.primary.main }} />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CoffeeDetailButtons;
