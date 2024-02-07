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
import profile from "../../assets/profile.svg";
import ToggleList from "../../components/common/ToggleList";
import BottomNav from "../../components/common/BottomNav";
import edit from "../../assets/images/icn_edit.svg";
import { Link, useNavigate } from "react-router-dom";
import { getFAQ, getMemberInfo, logoutMember } from "../../api/api";

const ProfileSection = ({ data }) => (
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
            p: 1,
            border: "1px solid #FEC93A",
          }}
        />
      </Grid>
      <Grid item container alignItems="center" justifyContent="center">
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            marginLeft: "1.375rem",
            fontWeight: "600",
          }}
        >
          {data.nickname || "닉네임 설정이 필요합니다"}
        </Typography>
        <Link to={{ pathname: "/mypage/infoedit", state: { data: data } }}>
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
          ></IconButton>
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
          sx={{ fontSize: "17px", paddingY: "12px", borderRadius: "8px" }}
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
      <Link to="/mypage/coffee">
        <Button
          sx={{ fontSize: "17px", paddingY: "12px", borderRadius: "8px" }}
          variant="contained"
          color="primary"
          fullWidth
          disableElevation
        >
          커피챗
        </Button>
      </Link>
    </Grid>
  </Grid>
);

export default function MyPage() {
  const navigate = useNavigate();

  const [memberInfo, setMemberInfo] = useState({});
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
          title: "1. 수집하는 개인 정보의 항목",
          content:
            "- 회원 가입 시: 이메일 주소, 닉네임, 기술 키워드 등\n- 서비스 이용 중: 검색 기록, 평가 정보 등",
        },
        {
          title: "2. 개인 정보의 수집 및 이용 목적",
          content:
            "- 회원 식별 및 서비스 제공을 위한 목적\n- 기술 키워드 및 검색 기록을 분석하여 맞춤형 서비스 제공",
        },
        {
          title: "3. 개인 정보의 보유 및 이용 기간",
          content: "- 회원이 탈퇴를 요청하거나 서비스 중단 시까지",
        },
        {
          title: "4. 개인 정보의 제3자 제공",
          content:
            "- 법령에서 정하는 경우를 제외하고는 제3자에게 제공하지 않습니다.",
        },
        {
          title: "5. 개인 정보의 파기",
          content:
            "- 회원이 탈퇴를 요청하거나 서비스 중단 시 즉시 파기되며, 법령에서 정하는 경우를 제외하고는 다른 목적으로 이용되지 않습니다.",
        },
        {
          title: "6. 개인 정보의 열람 및 수정",
          content:
            "- 회원은 언제든지 자신의 개인 정보를 열람하고 수정할 수 있습니다. 자세한 내용은 어플리케이션 내 [개인 정보 설정]을 참고하세요.",
        },
      ],
    },
    {
      id: 3,
      title: "서비스 이용 약관",
      children: [
        {
          title: "1. 서비스의 목적",
          content:
            "- 이 서비스는 개발자들을 위한 기술 영상 및 회사 추천 서비스를 제공하며, 사용자들 간의 소통을 도모하기 위한 커피챗 게시판을 포함합니다.",
        },
        {
          title: "2. 회사 추천 및 강의 영상",
          content:
            "- 기술 키워드에 기반한 회사 추천은 사용자의 선호 및 관심사를 분석하여 제공되며, 이는 알고리즘을 통해 이루어집니다.\n- 강의 영상 추천은 사용자의 검색 기록 및 평가를 토대로 이루어지며, 이는 개인의 학습 성향을 파악하여 최적화됩니다.",
        },
        {
          title: "3. 커피챗 게시판",
          content:
            "- 커피챗 게시판은 회원 간의 소통을 돕기 위한 플랫폼으로, 사용자는 해당 게시판을 통해 온라인 미팅을 신청하고 참여할 수 있습니다.\n- 사용자는 개인 정보를 안전하게 관리하고 다른 사용자에게 불필요한 정보를 제공하지 않아야 합니다",
        },
        {
          title: "4. 개인정보 수집 및 이용",
          content:
            "- 이 서비스는 회원가입 시에 필요한 최소한의 개인 정보를 수집하며, 이는 서비스 제공과 관련된 용도로만 사용됩니다.\n- 개인 정보는 법령에서 정하는 경우를 제외하고는 어떠한 경우에도 제3자에게 제공되지 않습니다.",
        },
        {
          title: "5. 서비스 이용 약관의 변경",
          content:
            "- 본 어플리케이션은 서비스 개선 및 법령 변경에 따라 서비스 이용 약관을 수정할 수 있습니다. 사용자들은 정기적으로 약관을 확인하여 변경사항을 파악해야 합니다.",
        },
        {
          title: "6. 권리 및 책임",
          content:
            "- 사용자는 서비스 이용 시 다른 사용자들을 존중하고 법령을 준수해야 합니다. 어플리케이션은 사용자의 행동에 대한 책임을 지지 않습니다.",
        },
        {
          title: "7. 문의 및 민원",
          content:
            "- 서비스 이용에 관한 문의 및 민원은 어플리케이션 내 [고객센터]를 통해 접수됩니다.",
        },
      ],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const memberData = await getMemberInfo();
        console.log(memberData.data);
        const faqData = await getFAQ();
        setMemberInfo(memberData.data);
        console.log("!!!1ddd", memberData.data.response.status);
        setFAQ(faqData.faqList || []);
        console.log("memberData", memberData.data.nickname);
        console.log("faq", faqData.faqList);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // alert("접근할 수 없는 페이지 입니다.");
          // navigate("/signin");
        }
        console.error("faq 에러", error);
      }
    };
    fetchData();
    console.log(memberInfo);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await logoutMember();
      console.log(res);

      if (res === 302) {
        localStorage.setItem("isLoggedInState", "false");
        navigate("/");
      }
    } catch (error) {
      console.error("로그아웃 에러", error);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "95vh",
        minwidth: "100vw",
        py: 10,
      }}
    >
      <ProfileSection data={memberInfo} />

      <ButtonSection />
      <ToggleList datas={noticeLists} />
      <Box sx={{ flexGrow: 1 }} />
      <Button
        position="sticky"
        bottom="0"
        variant="secondary"
        size="large"
        onClick={handleLogout}
        sx={{
          width: "100%",
          backgroundColor: "#EBEBEB",
          fontSize: "1.05rem",
          p: "13px",
          borderRadius: 10,
          color: "gray",
        }}
      >
        로그아웃
      </Button>
      <BottomNav></BottomNav>
    </Container>
  );
}
