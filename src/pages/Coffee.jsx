import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Modal,
  Pagination,
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
        <FF />
        <Chip
          label="최신순"
          clickable={true}
          variant="outlined"
          onClick={handleChipClick}
        ></Chip>

        <Chip label="직무" clickable={true} variant="outlined" />
        {openFilter && (
          <Modal
            open={openFilter}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
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
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                정렬선택 모달입니다
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
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
const F = [1, 2];
function FF() {
  return (
    <Stack sx={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={F.map((option) => option)}
        renderInput={(params) => <TextField {...params} label="freeSolo" />}
      />
    </Stack>
  );
}
