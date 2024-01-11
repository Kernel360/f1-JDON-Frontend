import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  datePicker,
  datePickerContainer,
  nicknameTextField,
} from "../info/InfoStyles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import format from "date-fns/locale/ko";
import Header from "../../components/common/Header";

function Coffeeopen() {
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <CssBaseline />
        <Header />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 700,
              paddingTop: 1,
              textAlign: "left",
            }}
          >
            커피챗 정보를 입력해주세요
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              mt: "30px",
              display: "flex",
              flexDirection: "column",
              gap: "13px",
              width: "100%",
            }}
          >
            <Box>
              <FormLabel>제목</FormLabel>
              <TextField
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="nickname"
                placeholder="커피챗 제목을 입력해주세요"
                onChange={(e) => {}}
                sx={nicknameTextField(null)}
              ></TextField>
            </Box>
            <Box>
              <FormLabel>상세 내용</FormLabel>
              <TextField
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="nickname"
                placeholder="커피챗 상세내용을 입력해주세요"
                onChange={(e) => {}}
                sx={nicknameTextField(null)}
              ></TextField>
            </Box>
            <Box>
              <Grid
                container
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Grid item xs={5.6}>
                  <FormLabel>총 모집 인원 </FormLabel>
                  <TextField
                    type="number"
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    name="총 모집 인원"
                    placeholder="숫자만 입력해주세요"
                    onChange={(e) => {}}
                    sx={nicknameTextField(null)}
                  ></TextField>
                </Grid>

                <Grid item xs={5.6}>
                  <FormLabel>일시</FormLabel>
                  <Grid container sx={datePickerContainer(null)}>
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      adapterLocale={format}
                    >
                      <DatePicker
                        inputFormat="yyyy.MM.dd"
                        sx={datePicker(null)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            sx={{ flexGrow: 1 }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Grid>
            </Box>

            <Box>
              <FormLabel>오픈채팅방 링크</FormLabel>
              <TextField
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="nickname"
                placeholder="커피챗 제목을 입력해주세요"
                onChange={(e) => {}}
                sx={nicknameTextField(null)}
              ></TextField>
            </Box>
            <Button
              sx={{
                mt: 3,
                mb: 3,
                width: "100%",
                p: "13px",
                borderRadius: "999px",
                background: "#6482FF",
                color: "#ffffff",
                fontSize: "16px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "#6482FF", // 클릭(마우스 오버) 시 배경색 변경
                },
              }}
            >
              등록하기
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
export default Coffeeopen;
