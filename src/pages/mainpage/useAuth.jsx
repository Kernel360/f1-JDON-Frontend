import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../../recoil/atoms";
import { Authentication } from "../../api/api";

export function useAuth() {
  const [isLogin, setIsLogin] = useRecoilState(isLoggedInState);
  useEffect(() => {
    (async () => {
      const state = await Authentication();
      setIsLogin(state);
    })();
  }, [setIsLogin]);

  return isLogin;
}
