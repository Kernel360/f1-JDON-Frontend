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
  const [isApplied, setIsApplied] = useState(false);

  const applyForCoffeeChat = async () => {
    try {
      await applyCoffeechat(id, applyCoffee);
      if (
        !window.confirm("신청이 완료되었습니다. 내 커피챗을 확인하시겠습니까?")
      )
        return;
      navigate("/mypage");
    } catch (error) {
      if (error.response?.status !== 409) {
        console.log("신청 중 에러가 발생했습니다.");
        return;
      }
      alert("이미 신청된 커피챗입니다.");
      setIsApplied(true);
      return;
    }
  };

  const editCoffeeChat = async () => {
    navigate(`/edit-coffee/${id}`);
  };

  const removeCoffeeChat = async () => {
    try {
      await deleteCoffeechat(id, applyCoffee);
      alert("삭제가 완료되었습니다");
      navigate("/coffee");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      setApplyCoffee({
        title: coffeeChatData.title,
        content: coffeeChatData.content,
        totalRecruitCount: coffeeChatData.totalRecruitCount,
        meetDate: coffeeChatData.meetDate,
        openChatUrl: coffeeChatData.openChatUrl,
      });
    })();
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
      <Box
        container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <Grid
          item
          xs={8}
          sm={8}
          fullwidth
          sx={{ display: "flex", gap: "12px", flexGrow: 1 }}
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
                background: !isApplied && theme.palette.primary.main,
                color: !isApplied && "white",
              }}
            ></NewBtn>
          )}
        </Grid>
        <Box item>
          <Button sx={buttonStyles.ShareButton} onClick={copyUrlToClipboard}>
            <ShareIcon sx={{ color: theme.palette.primary.main }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CoffeeDetailButtons;
