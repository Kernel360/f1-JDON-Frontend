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

const INITIAL_DATA = {
  nickname: "",
  birth: "",
  gender: "",
  jobCategoryId: "",
  skillList: [],
};

export default function Info() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(INITIAL_DATA);
  const navigate = useNavigate();

  const handleChange = (value) => {
    setData((prev) => ({ ...prev, ...value }));
  };

  const handleNextBtn = () => {
    if (step === 1) {
      if (data.nickname && data.birth && data.gender) {
        setStep(step + 1);
      } else alert("값을 다 입력하세요");
    } else if (step === 2) {
      if (!data.jobCategoryId) alert("직무를 선택해주세요");
      else setStep(step + 1);
    } else if (step === 3) {
      if (data.skillList < 3) alert("직무를 선택해주세요");
      else setStep(step + 1);
    } else setStep(step + 1);
  };

  useEffect(() => {
    localStorage.setItem("userInfo", []);
    if (step === 0) {
      navigate("../");
    }
    if (step === 4) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
  });

  return (
    <>
      {step < 4 && <ProgressBar step={step}></ProgressBar>}
      <Container maxWidth="sm">
        <CssBaseline />
        {step < 4 && (
          <Box sx={InfoStyle.FrameContainer}>
            {step === 1 && (
              <InFoBasic
                step={step}
                nickname={data.nickname}
                birth={data.birth}
                gender={data.gender}
                onChange={handleChange}
              ></InFoBasic>
            )}
            {step === 2 && (
              <InFoJD
                step={step}
                validate={data.jobCategoryId ? true : false}
                jobCategoryId={data.jobCategoryId}
                onChange={handleChange}
              ></InFoJD>
            )}
            {step === 3 && (
              <InfoSkill
                step={step}
                skills={data.skillList}
                jobCategoryId={data.jobCategoryId}
                onChange={handleChange}
              ></InfoSkill>
            )}
            {step < 4 && (
              <NavigationButtons
                step={step}
                onBefore={() => setStep(step - 1)}
                onNext={handleNextBtn}
              ></NavigationButtons>
            )}
          </Box>
        )}
        {step === 4 && <Done></Done>}
      </Container>
    </>
  );
}
