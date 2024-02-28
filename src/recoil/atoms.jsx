import { atom } from "recoil";

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: {},
});

export const userInfo = atom({
  key: "userInfoValues",
  default: {
    encrypted: "",
    hmac: "",
    nickname: "",
    birth: "",
    gender: "",
    jobCategoryId: null,
    skillList: [],
  },
});

export const jobIdState = atom({
  key: "jobIdState",
  default: "",
});

export const kindOfJdState = atom({
  key: "kindOfJdState",
  default: [],
});

export const selectedJobSkillState = atom({
  key: "selectedJobSkillState",
  default: [],
});
