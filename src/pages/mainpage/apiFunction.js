import { getLectureByKeyword, getMemberInfo } from "../../api/api";

//사용자 정보를 가져오는 함수
export const fetchUserInfo = async () => {
  try {
    const memberData = await getMemberInfo();
    localStorage.setItem("user", JSON.stringify(memberData.data));
    return memberData;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("faq 에러", error);
    }
  }
};

// 강의 데이터를 가져오는 함수
export const fetchLectureData = async (keyword) => {
  try {
    const datas = await getLectureByKeyword(keyword);
    return datas;
  } catch (error) {
    console.error("키워드별 데이터 가져오기 오류:", error);
    return { lectureList: [], jdList: [] };
  }
};
