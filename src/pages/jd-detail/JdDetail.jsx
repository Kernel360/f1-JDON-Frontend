import { Container, CssBaseline } from "@mui/material";
import Header from "components/common/Header";
import { CategoryTab } from "./CategoryTab";

export function JdDetail() {
  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Header title="jd 상세" />
      <CategoryTab />
    </Container>
  );
}
