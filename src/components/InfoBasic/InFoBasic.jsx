import {
  Box,
  Button,
  FormLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { NavigationButtons } from "../NavigationBtn";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import format from "date-fns/locale/ko";
import { useState } from "react";

export function InFoBasic() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [nickname, setNicname] = useState();
  const [birthday, setBirthday] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const handleCheckDuplicate = () => {
    // 중복확인 로직
  };
  return (
    <>
      <Typography
        width="100%"
        sx={{
          fontSize: 24,
          fontWeight: 700,
          marginTop: 2,
          textAlign: "left",
        }}
      >
        추가 정보를 알려주세요!
      </Typography>
      <Typography
        width="100%"
        sx={{
          fontSize: 16,
          textAlign: "left",
          marginTop: 1,
          color: "#BCBCC4",
        }}
      >
        서비스에 활용됩니다
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          mt: "65px",
          display: "flex",
          flexDirection: "column",
          gap: "13px",
          width: "100%",
        }}
      >
        <Box>
          <FormLabel>닉네임</FormLabel>

          <TextField
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
            id="nickname"
            name="nickname"
            autoComplete="nickname"
            placeholder="사용하실 닉네임을 입력해주세요"
            onChange={(e) => setNicname(e.target.value)}
            sx={{
              m: "10px auto",
              "& .MuiInputBase-input": {
                padding: "16px",
                fontSize: "16px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: "10px", // 기본 테두리 두께
                  borderColor: nickname ? "#6482FF" : "#BCBCC4",
                },
                "&:hover fieldset": {
                  borderColor: "#6482FF",
                },
                "&.Mui-focused fieldset": {
                  borderWidth: "2px",
                  borderColor: "#6482FF", // 포커스 시 색상 변경 안 함
                },
              },
            }}
            InputProps={{
              className: "nickname", // TextField의 input 요소에 className 적용
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    onClick={handleCheckDuplicate}
                    sx={{
                      background: "#F2F2F2",
                      color: "#BCBCC4",
                      fontSize: "12px",

                      padding: "7px 0,",
                    }}
                  >
                    중복확인
                  </Button>
                </InputAdornment>
              ),
            }}
          >
            <button style={{ width: "10px", height: "20px" }}>중복확인</button>
          </TextField>
        </Box>

        <Box>
          <FormLabel>생일</FormLabel>
          <Grid
            container
            sx={{
              m: "10px auto",
              width: "100%",
              border: "1px solid #BCBCC4",
              borderColor: birthday ? "#6482FF" : "#BCBCC4",
              borderRadius: "10px",
              "& .MuiInputBase-input": {
                padding: "16px",
              },
              "& .MuiFormControl-root": { width: "100%" },
            }}
          >
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={format}
            >
              <DatePicker
                value={selectedDate}
                inputFormat="yyyy.MM.dd"
                onChange={(newValue) => {
                  setSelectedDate(newValue);
                  setBirthday(newValue);
                }}
                sx={{
                  "& .MuiInputBase-root": { flexGrow: 1 },
                  "& .MuiOutlinedInput-root": {
                    border: "none", // TextField의 테두리 제거
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none", // 호버 및 포커스 상태에서의 테두리 제거
                  },

                  "& .MuiOutlinedInput-input": {
                    textAlign: "left", // 텍스트 필드를 왼쪽 정렬
                  },
                  "& .MuiInputAdornment-positionEnd": {
                    marginLeft: "auto", // 달력 아이콘을 오른쪽 정렬
                  },
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth sx={{ flexGrow: 1 }} />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Box>
        <Box>
          <FormLabel>성별</FormLabel>

          <Grid
            container
            sx={{
              justifyContent: "space-between",
              m: "10px auto",
              "& .MuiGrid-item": {
                padding: 0,
              },
            }}
          >
            <Grid item xs={5.5}>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  height: 56,
                  borderRadius: "10px",
                  borderColor: "#BCBCC4",
                  color: "#BCBCC4",
                  "&:hover": {
                    backgroundColor: "#E2E7FF", // 클릭 시 배경색
                    color: "#6482FF", // 클릭 시 텍스트 색
                  },
                }}
              >
                남
              </Button>
            </Grid>
            <Grid item xs={5.5}>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  height: 56,

                  borderRadius: "10px",
                  borderColor: "#BCBCC4",
                  color: "#BCBCC4",
                  "&:hover": {
                    backgroundColor: "#E2E7FF", // 클릭 시 배경색
                    color: "#6482FF", // 클릭 시 텍스트 색
                  },
                }}
              >
                여
              </Button>
            </Grid>
          </Grid>
        </Box>
        <NavigationButtons></NavigationButtons>
      </Box>
    </>
  );
}
