import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Avatar,
  Button,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";

import profile from "../assets/profile.svg";
import ToggleList from "../components/common/ToggleList";
import BottomNav from "../components/common/BottomNav";
import edit from "../assets/images/icn_edit.svg";
// import BottomNav from "../components/common/BottomNav";
import { Link } from "react-router-dom";
import { getFAQ } from "../api/api";

const ProfileSection = () => (
  <Grid
    container
    spacing={2}
    alignItems="center"
    justifyContent="center"
    marginBottom={5}
  >
    <Grid
      item
      xs={12}
      sm={10}
      container
      direction="column"
      spacing={2}
      alignItems="center"
    >
      <Grid item>
        <Avatar
          alt="user profile"
          src={profile}
          sx={{
            background: "inherit",
            width: "45px",
            height: "45px",
            border: "1px solid #FEC93A",
          }}
        />
      </Grid>
      <Grid item container alignItems="center" justifyContent="center">
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            marginLeft: "1.375rem",
            fontWeight: "600",
          }}
        >
          지렁이
        </Typography>
        <Link to="/mypage/infoedit">
          <IconButton
            aria-label="정보수정"
            color="black"
            style={{
              backgroundImage: `url(${edit})`,
              backgroundSize: "cover",
              margin: "11px",
              width: "17px",
              height: "17px",
            }}
          >
            {/* <ModeEditIcon />*/}
            {/* <img src="{edit}" /> */}
          </IconButton>
        </Link>
      </Grid>
    </Grid>
  </Grid>
);

const ButtonSection = () => (
  <Grid container spacing={1}>
    <Grid item xs={6}>
      <Link to="/mypage/video">
        <Button
          sx={{ fontSize: "17px", paddingY: "12px" }}
          variant="contained"
          color="primary"
          fullWidth
          disableElevation
        >
          찜
        </Button>
      </Link>
    </Grid>
    <Grid item xs={6}>
      <Button
        sx={{ fontSize: "17px", paddingY: "12px" }}
        variant="contained"
        color="primary"
        fullWidth
        disableElevation
      >
        커피챗
      </Button>
    </Grid>
  </Grid>
);

const privacy = [
  {
    id: 6,
    title: "1. 수집하는 개인 정보의 항목",
    content: "개인정보 하위 1의 내용입니다.",
  },
];

export default function MyPage() {
  const [FAQ, setFAQ] = useState([]);
  const noticeLists = [
    {
      id: 1,
      title: "FAQ",
      children: FAQ,
    },
    {
      id: 2,
      title: "개인정보 수집 및 이용",
      children: [
        {
          id: 6,
          title: "수집하는 개인 정보의 항목",
          content: [
            "회원 가입 시: 이메일 주소, 닉네임, 기술 키워드 등",
            "서비스 이용 중: 검색 기록, 평가 정보 등",
          ],
        },
        {
          id: 7,
          title: "2. 개인 정보의 수집 및 이용 목적",
          content: [
            "회원 식별 및 서비스 제공을 위한 목적",
            "기술 키워드 및 검색 기록을 분석하여 맞춤형 서비스 제공",
          ],
        },
        {
          id: 8,
          title: "3. 개인 정보의 보유 및 이용 기간",
          content: ["회원이 탈퇴를 요청하거나 서비스 중단 시까지"],
        },
      ],
    },
    {
      id: 3,
      title: "서비스 이용 약관",
      children: [
        {
          id: 9,
          title: "1. 서비스의 목적",
          content:
            "이 서비스는 개발자들을 위한 기술 영상 및 회사 추천 서비스를 제공하며, 사용자들 간의 소통을 도모하기 위한 커피챗 게시판을 포함합니다.",
        },
        {
          id: 10,
          title: "2. 회사 추천 및 강의 영상",
          content: [
            "2.1 기술 키워드에 기반한 회사 추천은 사용자의 선호 및 관심사를 분석하여 제공되며, 이는 알고리즘을 통해 이루어집니다.",
            "2.2 강의 영상 추천은 사용자의 검색 기록 및 평가를 토대로 이루어지며, 이는 개인의 학습 성향을 파악하여 최적화됩니다.",
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFAQ();
        const FAQData = data.faqList || [];
        setFAQ(FAQData);
        console.log("faq", data.faqList);
      } catch (error) {
        console.error("faq 에러", error);
      }
    };
    fetchData();
  }, []);
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "95vh",
        minwidth: "100vw",
        pb: 10,
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        fontSize="1rem"
        textAlign="center"
        padding={2}
        marginBottom={10}
      >
        마이페이지
      </Typography>
      <ProfileSection />
      <ButtonSection />
      <ToggleList datas={noticeLists} />
      <Box sx={{ flexGrow: 1 }} />
      <Button
        position="sticky"
        bottom="0"
        variant="secondary"
        size="large"
        sx={{ width: "100%", backgroundColor: "#EBEBEB", fontSize: "1.05rem" }}
      >
        로그아웃
      </Button>
      <BottomNav></BottomNav>
    </Container>
  );
}
