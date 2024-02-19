import { Container, CssBaseline } from "@mui/material";
import Header from "../../components/common/Header";
import CoffeeChatInfo from "./CoffeeChatInfo";
import { useEffect, useState } from "react";
import { getCoffeeChatDetail, getFavoritVideo } from "../../api/api";
import { useParams } from "react-router-dom";
import HostInfoWithViewcount from "./HostInfoWithViewcount";
import CoffeeDetailButtons from "./CoffeeDetailButtons";

function CoffeeDetail() {
  const { id } = useParams();
  const [coffeeChatData, setCoffeeChatData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getCoffeeChatDetail(id);
        setCoffeeChatData(res);
      } catch (error) {
        console.error("Error fetching getCoffeeChatDetail:", error);
      }
    })();
  }, [id]);

  if (!coffeeChatData) {
    return <div>존재하지 않는 커피챗입니다</div>;
  }

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Header title={coffeeChatData.title} />
      <HostInfoWithViewcount coffeeChatData={coffeeChatData} />
      <CoffeeChatInfo
        coffeeChatData={coffeeChatData}
        userIsHost={coffeeChatData.isAuthor}
      />
      <CoffeeDetailButtons
        id={id}
        host={coffeeChatData.isAuthor}
        coffeeChatData={coffeeChatData}
      />
    </Container>
  );
}

export default CoffeeDetail;
