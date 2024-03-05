import React, { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import ToggleList from "components/common/ToggleList";
import BottomNav from "components/common/BottomNav";
import { getFAQ, getJobCategory, getMemberInfo } from "api/api";
import { kindOfJdState } from "recoil/atoms";
import { useRecoilState } from "recoil";
import { getNoticeList } from "./notice";
import ProfileSection from "./ProfileSection";
import NavButtons from "./NavButtons";
import LogoutButton from "./LogoutButton";

export default function MyPage() {
  const [memberInfo, setMemberInfo] = useState({});

  const [FAQ, setFAQ] = useState([]);
  const [, setJobCategories] = useRecoilState(kindOfJdState);
  const noticeLists = getNoticeList(FAQ);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const memberData = await getMemberInfo();
        const faqData = await getFAQ();
        setMemberInfo(memberData.data);
        setFAQ(faqData.faqList || []);
        const { jobGroupList } = await getJobCategory();
        setJobCategories(jobGroupList[0].jobCategoryList);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // alert("접근할 수 없는 페이지 입니다.");
          // navigate("/signin");
        }
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
        py: 10,
      }}
    >
      <ProfileSection data={memberInfo} />
      <NavButtons />
      <ToggleList datas={noticeLists} />
      <Box sx={{ flexGrow: 1 }} />
      <LogoutButton />
      <BottomNav />
    </Container>
  );
}
