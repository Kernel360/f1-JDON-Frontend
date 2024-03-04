import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "recoil/atoms";
import { Authentication } from "api/api";

export function useAuth() {
  const [loginState, setLoginState] = useRecoilState(isLoggedInState);
  useEffect(() => {
    (async () => {
      const state = await Authentication();
      setLoginState({
        memberId: state.memberId,
        isLoginUser: state.isLoginUser,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { memberId, isLoginUser } = loginState;

  return { memberId, isLoginUser, setLoginState };
}
