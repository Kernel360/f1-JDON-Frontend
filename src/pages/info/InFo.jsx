import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useLocation, useNavigate } from "react-router-dom/dist";
import InFoBasic from "./InFoBasic";
import InFoJD from "./InfoJD";
import InfoSkill from "./InfoSkill";
import ProgressBar from "../../components/common/Progressbar";
import NavigationButtons from "../../components/common/navigation-btn/NavigationBtn";
import { InfoStyle } from "./InfoStyles";
import Done from "./Done";
import { registerUserInfo } from "../../api/api";
import { userInfo } from "../../recoil/atoms";
import { useRecoilState } from "recoil";

// const INITIAL_DATA = {
//   encrypted: "",
//   hmac: "",
//   nickname: "",
//   birth: "",
//   gender: "",
//   jobCategoryId: "",
//   skillList: [],
// };

export default function Info() {
  const [step, setStep] = useState(1);
  const [data, setData] = useRecoilState(userInfo);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (value) => {
    setData((prev) => ({ ...prev, ...value }));
  };

  const handleNextBtn = () => {
    const validateStep = () => {
      if (step === 1 && !(data.nickname && data.birth && data.gender)) {
        alert("값을 다 입력하세요");
        return false;
      }
      if (step === 2 && !data.jobCategoryId) {
        alert("직무를 선택해주세요");
        return false;
      }
      if (step === 3 && data.skillList.length < 3) {
        alert("최소 3개 이상의 기술을 선택하세요");
        return false;
      }
      return true;
    };

    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleOAuthKakao = async (value, hmac) => {
    console.log("handleOAuthKakao 시작", value, hmac);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const value = searchParams.get("value");
    const hmac = searchParams.get("hmac");
    if (value && hmac) {
      handleChange({ encrypted: value, hmac: hmac });
      handleOAuthKakao(value, hmac);
    }
  }, [location]);

  useEffect(() => {
    console.log(data);
    localStorage.setItem("userInfo", []);
    if (step === 0) {
      navigate("../");
    }
    if (step === 4) {
      const registerData = async () => {
        try {
          const response = await registerUserInfo(data);
          console.log("회원 정보 등록 성공:", response);
          localStorage.setItem("userInfo", JSON.stringify(data));
          navigate("/success");
        } catch (error) {
          console.error("회원 정보 등록 실패:", error);
          navigate("/fail");
        }
      };
      registerData();
    }
  }, [step, data, navigate]);

  const renderStepComponent = () => {
    switch (step) {
      case 1:
        return (
          <InFoBasic
            step={step}
            nickname={data.nickname}
            birth={data.birth}
            gender={data.gender}
            onChange={handleChange}
          />
        );
      case 2:
        return (
          <InFoJD
            step={step}
            validate={!!data.jobCategoryId}
            jobCategoryId={data.jobCategoryId}
            onChange={handleChange}
          />
        );
      case 3:
        return (
          <InfoSkill
            step={step}
            skills={data.skillList}
            jobCategoryId={data.jobCategoryId}
            onChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {step < 4 && <ProgressBar step={step}></ProgressBar>}
      <Container maxWidth="sm">
        <CssBaseline />
        {step < 4 && (
          <Box sx={InfoStyle.FrameContainer}>
            {renderStepComponent()}
            {step < 4 && (
              <NavigationButtons
                step={step}
                onBefore={() => setStep(step - 1)}
                onNext={handleNextBtn}
              />
            )}
          </Box>
        )}
        {step === 4 && <Done />}
      </Container>
    </>
  );
}
