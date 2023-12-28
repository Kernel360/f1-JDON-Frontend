import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Modal,
  Pagination,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SearchBar } from "../components/search-bar/SearchBar";
import { useState } from "react";
import BottomNav from "../components/BottomNav";
import CoffeeChatCard from "../components/card_coffeechat/CoffeeChatCard";

export function Coffee() {
  const [openFilter, setOpenFilter] = useState(false);
  const handleClose = () => setOpenFilter(false);
  const COFFEECHAT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleChipClick = () => {
    setOpenFilter(!openFilter);
  };
  return (
    <Container maxWidth="md" sx={{ pb: 10 }}>
      <SearchBar />
      <Box>
        <Chip
          label="최신순"
          clickable={true}
          variant="outlined"
          onClick={handleChipClick}
        ></Chip>

        <Chip label="직무" clickable={true} variant="outlined" />
        {openFilter && (
          <Modal open={openFilter} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                borderRadius: 10,
                border: "none",
              }}
            >
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="최신순"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="최신순"
                    control={<Radio />}
                    label="최신순"
                  />
                  <FormControlLabel
                    value="조회순"
                    control={<Radio />}
                    label="조회순"
                  />
                  <FormControlLabel
                    value="인기 높은 순"
                    control={<Radio />}
                    label="인기 높은 순"
                  />
                  <FormControlLabel
                    value="인기 낮은 순"
                    control={<Radio />}
                    label="인기 낮은 순"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Modal>
        )}
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" disableElevation>
          커피챗 오픈
        </Button>
      </Box>

      <Grid container spacing={{ xs: 2, md: 2 }}>
        {COFFEECHAT.map((item, index) => (
          <Grid item xs={6} sm={6} md={6} key={index}>
            <CoffeeChatCard></CoffeeChatCard>
          </Grid>
        ))}
      </Grid>

      <BasicPagination />
      <BottomNav></BottomNav>
    </Container>
  );
}

export default function BasicPagination() {
  return (
    <Box
      sx={{
        width: "100%",
        py: 3,
      }}
    >
      <Stack justifyContent="center" alignItems="center">
        <Pagination
          count={10}
          variant="outlined"
          size="large"
          color="primary"
        />
      </Stack>
    </Box>
  );
}
const options = ["최신순", "조회순", "인기 낮은순", "인기 높은 순"]; // 옵션 예시
function FF() {
  return <Stack></Stack>;
}
