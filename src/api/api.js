import axios from "axios";
const apiUrl = process.env.REACT_APP_API_BASE_URL;
const instance = axios.create({
  withCredentials: true,
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    // Origin: "https://jdon.kr",

    // 기타 필요한 헤더 설정(JWT토큰)
  },
});

// -------------------------------------------- member
//최종 회원 정보 등록
export async function registerUserInfo(userInfo) {
  try {
    const res = await instance.post("/api/v1/register", userInfo);
    console.log("registerUserInfo API", res.data);
    return res.data;
  } catch (error) {
    console.error("registerUserInfo API error", error);
    throw error;
  }
}

//닉네임 중복 확인
export async function checkNicknameDuplicate(nickName) {
  try {
    console.log(nickName);
    const res = await instance.post("/api/v1/nickname/duplicate", nickName);
    console.log("checkNicknameDuplicate API", res);
    return res.status;
  } catch (error) {
    console.log("checkNicknameDuplicate API error", error);
    throw error;
  }
}

//회원정보 불러오기
export async function getMemberInfo() {
  try {
    // console.log(nickName);
    const res = await instance.get("/api/v1/member");
    console.log("getMemberInfo API", res);
    return res.data;
  } catch (error) {
    console.log("getMemberInfo API error", error);
    throw error;
  }
}

//회원정보 수정하기
export async function updateMemberInfo(data) {
  try {
    console.log("업데이트 멤버 정보", data);
    const res = await instance.put("/api/v1/member");
    console.log("getMemberInfo API", res);
    return res.data;
  } catch (error) {
    console.log("getMemberInfo API error", error);
    throw error;
  }
}

//회원 로그아웃
export async function logoutMember() {
  try {
    // console.log(nickName);
    const res = await instance.get("/api/v1/logout");
    console.log("logoutMember API", res);
    return res;
  } catch (error) {
    console.log("logoutMember API error", error);
    throw error;
  }
}

//회원 탈퇴
export async function deleteMember() {
  try {
    // console.log(nickName);
    const res = await instance.delete("/api/v1/withdraw");
    console.log("deleteMember API", res);
    return res.data;
  } catch (error) {
    console.log("deleteMember API error", error);
    throw error;
  }
}

// -------------------------------------------- skill

//요즘 뜨는 기술스택 조회
export async function getHotSkills() {
  try {
    const res = await instance.get("/api/v1/skills/hot");
    // console.log("getHotSkills API", res.data);
    return res.data;
  } catch (error) {
    console.error("getHotSkills API error", error);
    throw error;
  }
}

//회원 맞춤 기술스택 조회
export async function getMemberSkills() {
  try {
    const res = await instance.get("/api/v1/skills/member");
    console.log("getMemberSkills API", res.data);
    return res.data;
  } catch (error) {
    console.error("getMemberSkills API error", error);
    throw error;
  }
}

// //id로 - 기술 스택 기반 원티드JD, 인프런 강의 데이터 조회하기
// export async function getLecture(skillId) {
//   try {
//     const res = await instance.get(`/api/v1/skills/search?skillId=${skillId}`);
//     // console.log("getLecture API", res.data);
//     return res.data.data;
//   } catch (error) {
//     console.error("getLecture API error", error);
//     throw error;
//   }
// }
//키워드로 - 기술 스택 기반 원티드JD, 인프런 강의 데이터 조회하기
export async function getLectureByKeyword(keyword) {
  try {
    const res = await instance.get(`/api/v1/skills/search?keyword=${keyword}`);
    //  console.log("getLectureByKeyword API", res.data);
    return res.data.data;
  } catch (error) {
    console.error("getLectureByKeyword API error", error);
    throw error;
  }
}

//직무 별 기술스택 조회하기
export async function getSkillsOnJD(jobCategoryId) {
  // console.log("api에서 확인중", jobCategoryId);
  try {
    const res = await instance.get(
      `/api/v1/skills/job-category/${jobCategoryId}`
    );
    //  console.log("getSkillsOnJD API", res.data.data);
    return res.data.data;
  } catch (error) {
    console.error("getSkillsOnJD API error", error);
    throw error;
  }
}

// -------------------------------------------- favorite
// 영상 찜하기 등록
export const postFavoritVideo = async (data) => {
  console.log("!!vedio data check", data);

  try {
    const res = await instance.post(`/api/v1/favorites`, data);
    console.log("postFavoritVideo 응답", res.data);
    return res.data;
  } catch (error) {
    console.error("getFavoritVideo API", error);
    throw error;
  }
};

// 내가 찜한 영상 목록 조회
export const getFavoritVideo = async () => {
  try {
    const res = await instance.get(`/api/v1/favorites?page=0&size=12`);
    console.log("getFavoritVideo api 파일", res.data);
    return res.data;
  } catch (error) {
    console.error("getFavoritVideo API", error);
    throw error;
  }
};

// -------------------------------------------- faq

// faq 목록조회

export const getFAQ = async () => {
  try {
    // console.log("FAQ");
    const res = await instance.get(`/api/v1/faqs`);
    return res.data.data;
  } catch (error) {
    console.error("getFAQ API 통신에러", error);
    throw error;
  }
};
// -------------------------------------------- job_category
//직군 별 직무 조회
export const getJobCategory = async () => {
  try {
    const res = await instance.get("/api/v1/job-categories");
    return res.data.data;
  } catch (error) {
    console.error("getJobCategory API", error);
    throw error;
  }
};
// -------------------------------------------- coffeechat

//내가 오픈한 커피챗 목록 조회

export const getMyCoffeeChat = async (page) => {
  console.log("@@@page", page);

  try {
    console.log("page check", page);
    const res = await instance.get(
      `/api/v1/coffeechats/host?page=${page}&size=12`
    );
    return res.data.data;
  } catch (error) {
    console.error("getMyCoffeeChat API", error);
    throw error;
  }
};

//내가 신청한 커피챗 목록 조회
export const getSignCoffeeChat = async (page) => {
  console.log("!!!page", page);
  try {
    console.log("page check", page);
    const res = await instance.get(
      `/api/v1/coffeechats/guest?page=${page}&size=12&sort=createdDate`
    );
    return res.data.data;
  } catch (error) {
    console.error("getMyCoffeeChat API", error);
    throw error;
  }
};

//커피챗 목록 조회
export const getCoffeeChat = async (page, size, sorting, jobCategory) => {
  try {
    console.log(" check eveything", page, size, sorting, jobCategory);
    const res = await instance.get(
      `/api/v1/coffeechats?page=${page}&size=${size}&sort=${sorting}&jobCategory=${jobCategory}`
    );
    return res.data.data;
  } catch (error) {
    console.error("getCoffeeChat API", error);
    throw error;
  }
};

//커피챗 상세 조회
export const getCoffeeChatDetail = async (id) => {
  try {
    const res = await instance.get(`api/v1/coffeechats/${id}`);
    console.log("getCoffeeChatDetail", res.data);
    return res.data.data;
  } catch (error) {
    console.error("getCoffeeChatDetail API", error);
    throw error;
  }
};

//커피챗 등록
export async function registerCoffeeChat(coffeeChat) {
  console.log("333", JSON.stringify(coffeeChat));
  try {
    const res = await instance.post("/api/v1/coffeechats", coffeeChat);
    console.log("registerCoffeeChat API", res.data);
    return res.data;
  } catch (error) {
    console.error("registerCoffeeChat API error", error);
    throw error;
  }
}

//커피챗 수정
export async function updateCoffeechat(id) {
  try {
    const res = await instance.put(`/api/v1/coffeechats/${id}`);
    console.log("getMemberInfo API", res);
    return res.data;
  } catch (error) {
    console.log("getMemberInfo API error", error);
    throw error;
  }
}

//커피챗 삭제
export async function deleteCoffeechat(id) {
  try {
    // console.log(nickName);
    const res = await instance.delete(`/api/v1/coffeechats/${id}`);
    console.log("deleteCoffeechat API", res);
    return res.data;
  } catch (error) {
    console.log("deleteCoffeechat API error", error);
    throw error;
  }
}

//커피챗 신청
export async function applyCoffeechat(id) {
  try {
    const res = await instance.post(`/api/v1/coffeechats/${id}`);
    console.log("applyCoffeechat API", res);
    return res.data;
  } catch (error) {
    console.log("applyCoffeechat API error", error);
    throw error;
  }
}

// -------------------------------------------- faq
