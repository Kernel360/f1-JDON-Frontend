import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  Modal,
  Pagination,
  Stack,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import { SearchBar } from "../components/search-bar/SearchBar";
import { useRef, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ChipStyle, MainStyles } from "./PageStyles";
import { ArrowBackIos, ArrowForwardIos, Filter } from "@mui/icons-material";
import CompanyCard from "../components/card_company/CompanyCard";
import VideoCard from "../components/card_video/VideoCard";
import video1 from "../../src/assets/video1.svg";
import video2 from "../../src/assets/video2.svg";
import video3 from "../../src/assets/video3.svg";
import BottomNav from "../components/BottomNav";
import CoffeeChatCard from "../components/card_coffeechat/CoffeeChatCard";

const HOT_SKILLS = [
  "JavaScript",
  "React",
  "Recoil",
  "Context Api",
  "everland",
  "I want to go",
  "푸바오",
  "보고시퍼요",
  "금요일",
  "내일 주말",
];
const MY_SKILLS = [11111, 22, 333333, 4, 555555, 66, 7777777, 88, 999, 1000];

const COMPANY_DATA = [
  {
    id: 0,
    name: "패스오더",
    content: "[패스오더]백엔드 개발자(Spring, Python, MSA)",
  },
  { id: 1, name: "에듀템", content: "JAVA 스프링부트 개발자" },
  { id: 2, name: "MOLOCO", content: "[MOLOCO] Senior Staff Software Engineer" },
  { id: 4, name: "아모레퍼시픽", content: "content4" },
  {
    id: 5,
    name: "이름인 아주아주아주아주아주아주 긴 회사",
    content: "content5",
  },
  { id: 6, name: "apple", content: "content6" },
];
const VIDEO_DATA = [
  {
    id: 0,
    name: "지렁이",
    content: "javascript 기초",
    price: "2000원",
    img: video1,
  },
  {
    id: 1,
    name: "레오",
    content: "Spring Boot - 나만의 포트폴리오 사이트 만들기",
    price: "7000원",
    img: video2,
  },
  {
    id: 2,
    name: "연세IT미래교육원",
    content: "[연세IT미래교육원] 데이터 분석을 위한 올인원 취업캠프",
    price: "0원",
    img: video3,
  },
];

export function Coffee() {
  const [openFilter, setOpenFilter] = useState(false);
  const handleOpen = () => setOpenFilter(true);
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
      <Stack spacing={5} justifyContent="center" alignItems="center">
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
