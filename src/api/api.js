import axios from "axios";
const apiUrl = process.env.REACT_APP_API_BASE_URL;
const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    // 기타 필요한 헤더 설정(JWT토큰)
  },
});

// //-------------------------------------------- skill

export async function getHotSkills() {
  try {
    const res = await instance.get("/api/v1/skills/hot");

    console.log("getHotSkills API", res);
    return res.data;
  } catch (error) {
    console.error("getHotSkills API error", error);
    throw error;
  }
}
// // export async function createReview(formData) {
// //   //throw new Error("버그가 아니라 기능입니다");
// //   // return 필수로 존재해야 한다 !! 없으면 데이터 못불러옴
// //   const response = await fetch(`https://learn.codeit.kr/0627/film-reviews`, {
// //     method: "POST",
// //     body: formData,
// //   });

// //   if (!response.ok) throw new Error("리뷰를 생성하는데 실패하였습니다");

// //   return await response.json(); //비동기 작업이므로
// // }

// // export const getFaq = async () => {
// //   try {
// //     const response = await fetch(`${apiUrl}/api/v1/faqs`);
// //     if (!response.ok) {
// //       throw new Error(`API 요청 실패: ${response.status}`);
// //     }

// //     const data = await response.json();
// //     return data;
// //   } catch (error) {
// //     console.error(error);
// //     throw error;
// //   }
// // };

export const getFavoritVideo = async (page) => {
  try {
    console.log("page check", page);
    const res = await instance.get(`/api/v1/favorites?page=${page}&size=12`);
    console.log("pageCnt", res.headers);
    return res.data;
  } catch (error) {
    console.error("getFavoritVideo API", error);
    throw error;
  }
};

export const getLecture = async () => {
  try {
    const res = await instance.get(`/api/v1/skills/search?keyword=redis`);
    console.log("강의 추천 데이터", res);
    return res.data.data;
  } catch (error) {
    console.error("추천학습영상 데이터를 받아오지 못했습니다.", error);
    throw error;
  }
};
