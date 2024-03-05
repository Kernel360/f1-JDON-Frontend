import { Container, CssBaseline } from "@mui/material";
import Header from "../../components/common/Header";
import CoffeeChatInfo from "./CoffeeChatInfo";
import { useEffect, useState } from "react";
import { getCoffeeChatDetail } from "../../api/api";
import { useParams } from "react-router-dom";
import HostInfoWithViewcount from "./HostInfoWithViewcount";
import CoffeeDetailButtons from "./CoffeeDetailButtons";
import { BeatLoader } from "react-spinners";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../../recoil/atoms";

function CoffeeDetail() {
  const { id } = useParams();
  const [coffeeChatData, setCoffeeChatData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const loginState = useRecoilValue(isLoggedInState);
  const [isParticipant, setIsParticipant] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await getCoffeeChatDetail(id);
        setCoffeeChatData(res);
        setIsParticipant(res.isParticipant);
      } catch (error) {
        console.error("Error fetching getCoffeeChatDetail:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  if (isLoading) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(255, 255, 255, 0.6)",
        }}
      >
        <BeatLoader />
      </div>
    );
  }

  // if (!coffeeChatData) {
  //   return <div>존재하지 않는 커피챗입니다</div>;
  // 이건 에러번호로 하기
  // }

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Header title={coffeeChatData.title} />
      <HostInfoWithViewcount coffeeChatData={coffeeChatData} />
      <CoffeeChatInfo
        coffeeChatData={coffeeChatData}
        canView={
          coffeeChatData.hostId === loginState.memberId ||
          coffeeChatData.isParticipant
        }
        isParticipant={isParticipant}
      />

      <CoffeeDetailButtons
        id={id}
        host={coffeeChatData.hostId === loginState.memberId}
        isParticipant={isParticipant}
        setIsParticipant={setIsParticipant}
        coffeeChatData={coffeeChatData}
      />
    </Container>
  );
}

export default CoffeeDetail;
