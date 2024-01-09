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
import paste from "../../assets/icons/paste.svg";
import { URLInput } from "../PageStyles";
import Buttons from "./Button";

function CoffeeDetail() {
  return (
    <Container maxWidth="md" sx={{ pb: 10 }}>
      <CssBaseline />
      <Header />
      <Box
        sx={{
          px: "6px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: "12px" }}>
          <Typography sx={{ color: "#1D1D1D", fontWeight: 300 }}>
            name
          </Typography>
          <Typography
            variant="body2"
            color="#FF814D"
            border="1px solid #FF814D"
            borderRadius="999px"
            sx={{
              width: "fit-content",
              padding: "3px 6px",
            }}
          >
            backend
          </Typography>
        </Box>
        <Typography sx={{ color: "#B9B9B9", fontSize: "12px" }}>
          조회수
        </Typography>
      </Box>
      <InfoBox />
      <Divider />
      <Typography sx={{ py: "24px" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo con Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
        fugiat nulla pariatu Excepteur sint occaecat cupidatat non proident,
        sunt in culpa qui officia deserunt mollit anim id es
      </Typography>
      <TextField
        fullWidth
        InputLabelProps={{ shrink: true }}
        sx={URLInput}
        id="nickname"
        name="nickname"
        autoComplete="nickname"
        placeholder="openkakao.comasdkj/dkjfwkjdfhkwdjf"
        InputProps={{
          readOnly: true,
          disabled: true,
          endAdornment: (
            <InputAdornment position="end" sx={{ background: "transparent" }}>
              <Button>
                <img src={paste} alt="복사" />
              </Button>
            </InputAdornment>
          ),
        }}
      ></TextField>
      <Buttons></Buttons>
    </Container>
  );
}

export default CoffeeDetail;
