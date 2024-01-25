import axios from "axios";
const apiUrl = process.env.REACT_APP_API_BASE_URL;
const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    // 기타 필요한 헤더 설정(JWT토큰)
  },
});

// -------------------------------------------- skill

//요즘 뜨는 기술스택 조회

export async function getHotSkills() {
  try {
    const res = await instance.get("/api/v1/skills/hot");
    console.log("getHotSkills API", res.data);
    return res.data;
  } catch (error) {
    console.error("getHotSkills API error", error);
    throw error;
  }
}

//기술 스택 기반 원티드JD, 인프런 강의 데이터 조회하기

export async function getLecture({ skillId }) {
  try {
    const res = await instance.get(`/api/v1/skills/search?${skillId}`);
    console.log("getLecture API", res.data.data);
    return res.data.data;
  } catch (error) {
    console.error("getLecture API error", error);
    throw error;
  }
}

// -------------------------------------------- favorite

// 내가 찜한 영상 목록 조회
export const getFavoritVideo = async (page) => {
  try {
    // console.log("page check", page);
    const res = await instance.get(`/api/v1/favorites?page=${page}&size=12`);
    console.log("pageCnt", res.headers);
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
// -------------------------------------------- coffeechat

//내가 신청한 커피챗 목록 조회

//내가 오픈한 커피챗 목록 조회

//커피챗 목록 조회
export const getCoffeeChat = async (page) => {
  try {
    console.log("page check", page);
    const res = await instance.get(`/api/v1/coffeechats?page=${page}&size=12`);
    console.log("getCoffeeChat", res);
    return res.data.data;
  } catch (error) {
    console.error("getCoffeeChat API", error);
    throw error;
  }
};

//커피챗 상세 조회
export const getCoffeeChatDetail = async (id) => {
  try {
    const res = await instance.get(`/api/v1/coffeechats?${id}`);
    console.log("getCoffeeChatDetail", res.data);
    return res.data.data;
  } catch (error) {
    console.error("getCoffeeChatDetail API", error);
    throw error;
  }
};

//커피챗 등록

//커피챗 수정

//커피챗 삭제

//커피챗 신청
// -------------------------------------------- member
// -------------------------------------------- faq
