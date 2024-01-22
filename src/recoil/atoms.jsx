import { atom } from "recoil";

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false, // 초기값은 로그인되어 있지 않음을 나타냅니다.
});
