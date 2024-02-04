import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom/dist";
import InFoBasic from "./InFoBasic";
import InFoJD from "./InfoJD";
import InfoSkill from "./InfoSkill";
import ProgressBar from "../../components/common/Progressbar";
import NavigationButtons from "../../components/common/navigation-btn/NavigationBtn";
import { InfoStyle } from "./InfoStyles";
import Done from "./Done";
import { getJobCategory, registerUserInfo } from "../../api/api";
import { isLoggedInState, userInfo } from "../../recoil/atoms";
import { useRecoilState } from "recoil";

export default function Info() {
  const [step, setStep] = useState(1);
  const [data, setData] = useRecoilState(userInfo);
  const [isLogin, setIsLogin] = useRecoilState(isLoggedInState);
  const [jobCategory, setJobCategory] = useState();
  const navigate = useNavigate();

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

  useEffect(() => {
    console.log(data);
    // localStorage.setItem("userInfo", []);
    if (step === 0) {
      navigate("../");
    }
    if (step === 4) {
      const registerData = async () => {
        try {
          const response = await registerUserInfo(data);
          console.log("회원 정보 등록 성공:", response);
          localStorage.setItem("isLoggedInState", true);
          setIsLogin(true);
          navigate("/");
        } catch (error) {
          console.error("회원 정보 등록 실패:", error);
          navigate("/fail");
        }
      };
      registerData();
    }
  }, [step, data, navigate, setIsLogin]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getJobCategory();
        setJobCategory(data.jobGroupList[0].jobCategoryList);
      } catch (error) {
        console.error("Error fetching hot skills:", error);
      }
    };
    fetchData();
  }, []);

  const renderStepComponent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <InFoBasic step={step} onChange={handleChange} />
            <NavigationButtons
              step={step}
              isActive={data.nickname && data.birth && data.gender}
              onBefore={() => setStep(step - 1)}
              onNext={handleNextBtn}
            />
          </>
        );
      case 2:
        return (
          <>
            <InFoJD
              jobCategoryId={data.jobCategoryId}
              jobCategory={jobCategory}
              onChange={handleChange}
            />
            <NavigationButtons
              step={step}
              isActive={data.jobCategoryId}
              onBefore={() => setStep(step - 1)}
              onNext={handleNextBtn}
            />
          </>
        );
      case 3:
        return (
          <>
            <InfoSkill step={step} onChange={handleChange} />
            <NavigationButtons
              step={step}
              isActive={data.skillList.length > 2}
              onBefore={() => setStep(step - 1)}
              onNext={handleNextBtn}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {step < 4 && <ProgressBar step={step}></ProgressBar>}
      <Container maxWidth="sm">
        <CssBaseline />
        {step < 4 && (
          <Box sx={InfoStyle.FrameContainer}>{renderStepComponent()}</Box>
        )}
        {step === 4 && <Done />}
      </Container>
    </div>
  );
}
