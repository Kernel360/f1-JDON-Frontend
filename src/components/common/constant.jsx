import { useNavigate } from "react-router-dom";

export const PromptLogin = () => {
  const navigate = useNavigate();
  const userAgrees = window.confirm(
    `찜은 로그인 후 이용할 수 있습니다. \n 로그인 페이지로 이동하시겠습니까?`
  );
  if (userAgrees) navigate("/signin");
};
