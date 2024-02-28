import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../../recoil/atoms";
import { Authentication } from "../../api/api";

export function useAuth() {
  const [loginState, setLoginState] = useRecoilState(isLoggedInState);
  useEffect(() => {
    (async () => {
      const state = await Authentication();
      setLoginState({
        memberId: state.memberId,
        loginUser: state.loginUser,
      });
    })();
  }, []);

  const { memberId, loginUser } = loginState;

  return { memberId, loginUser };
}
