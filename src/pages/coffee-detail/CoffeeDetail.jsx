import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/common/Header";
import InfoBox from "./InfoBox";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { URLInput } from "../PageStyles";
import Buttons from "./Button";
import eye from "../../assets/icons/eye.svg";
import { useEffect, useRef, useState } from "react";
import { getCoffeeChatDetail } from "../../api/api";
import TotalInputForm from "../../components/common/total-input-form/TotalInputForm";
import { useParams } from "react-router-dom";
import { jobStyle } from "../../components/common/card/CardStyle";

function CoffeeDetail({ host = true }) {
  const params = useParams();
  const [coffeeChatData, setCoffeeChatData] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef(null);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(coffeeChatData.openChatUrl);
      setIsCopied(true);
    } catch (error) {
      console.error("클립보드 복사 실패:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCoffeeChatDetail(params.id);
        console.log(res.title);
        setCoffeeChatData(res);
        return res.data;
      } catch (error) {
        console.error("Error fetching getCoffeeChatDetail:", error);
      }
    };
    fetchData();
  }, [params.id]);

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Header title={coffeeChatData.title} />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            px: "6px",
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Typography
              sx={{ color: "#9A9AA1", fontWeight: 400, fontSize: "13px" }}
            >
              {coffeeChatData.nickname}
            </Typography>
            {coffeeChatData.job && (
              <div style={jobStyle(coffeeChatData.job)}>
                {coffeeChatData.job}
              </div>
            )}
          </Box>
          <Typography
            sx={{
              color: "#B9B9B9",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <img src={eye} alt="조회수" />
            {coffeeChatData.viewCount}
          </Typography>
        </Box>
        <Typography sx={{ px: "6px", fontSize: "20px", mt: "22px" }}>
          {coffeeChatData.title}
        </Typography>
        <InfoBox data={coffeeChatData} />
        <Divider />

        <Typography sx={{ color: "#545459", py: 3, minHeight: "180px" }}>
          {coffeeChatData.content}
        </Typography>
        <TotalInputForm value={false} label="오픈채팅 링크">
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={URLInput}
            ref={inputRef}
            value={
              host ? coffeeChatData.openChatUrl : "신청 후 확인 가능합니다"
            }
            InputProps={{
              readOnly: true,
              disabled: true,
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{ background: "transparent" }}
                >
                  {host && (
                    <Button onClick={handleCopyClick}>
                      {isCopied ? (
                        <p style={{ fontSize: "12px" }}>Copied!</p>
                      ) : (
                        <FileCopyIcon sx={{ fontSize: 20, color: "#BCBCC4" }} />
                      )}
                    </Button>
                  )}
                </InputAdornment>
              ),
            }}
          ></TextField>
        </TotalInputForm>
        <Buttons host={false}></Buttons>
      </Box>
    </Container>
  );
}

export default CoffeeDetail;
