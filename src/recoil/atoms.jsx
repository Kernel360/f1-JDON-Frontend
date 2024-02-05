import { atom } from "recoil";

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false, // 초기값은 로그인되어 있지 않음을 나타냅니다.
});

export const userInfo = atom({
  key: "userInfoValues",
  default: {
    encrypted: "",
    hmac: "",
    nickname: "",
    birth: "",
    gender: "",
    jobCategoryId: "",
    skillList: [],
  },
});

export const jobIdState = atom({
  key: "jobIdState",
  default: "",
});

export const selectedJobSkillState = atom({
  key: "selectedJobSkillState",
  default: [],
});
