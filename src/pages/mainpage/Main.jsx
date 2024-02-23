import { Container } from "@mui/material";
import { useRef } from "react";
import BottomNav from "../../components/common/BottomNav";
import CompanySection from "./CompanySection";
import VideoSection from "./VideoSection";
import HeaderWithSearchBar from "./HeaderWithSearchBar";
import SubmitBug from "./SubmitBug";
import StickyTabSection from "./StickyTabSection";
import SrcollToTop from "./ScrollToTop";
import { useAuth } from "./useAuth";
import { useLoadData } from "./useLoadData";

export function Main() {
  const isLogin = useAuth();
  const { selectedChip, setSelectedChip, lectureList, jdList } = useLoadData(); // 데이터 로딩 및 상태 관리
  const topRef = useRef(null);

  return (
    <div ref={topRef}>
      <Container maxWidth="md" sx={{ pb: 10, position: "relative" }}>
        <HeaderWithSearchBar setSelectedChip={setSelectedChip} />
        <SrcollToTop topRef={topRef} />
        <StickyTabSection
          isLogin={isLogin}
          selectedChip={selectedChip}
          setSelectedChip={setSelectedChip}
        />
        <VideoSection selectedChip={selectedChip} data={lectureList} />
        <CompanySection selectedChip={selectedChip} data={jdList} />
        <SubmitBug />
        <BottomNav />
      </Container>
    </div>
  );
}
