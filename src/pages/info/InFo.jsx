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

  useEffect(() => {
    localStorage.setItem("userInfo", []);
    if (step === 0) {
      navigate("../");
    }
    if (step === 4) {
      navigate("../main");
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
  });

  return (
    <>
      <ProgressBar step={step}></ProgressBar>
      <Container maxWidth="sm">
        <CssBaseline />
        <Box sx={InfoStyle.FrameContainer}>
          {step === 1 && (
            <InFoBasic
              nickname={data.nickname}
              birthday={data.birth}
              sex={data.gender}
              onChange={handleChange}
            ></InFoBasic>
          )}
          {step === 2 && (
            <InFoJD jd={data.jobCategoryId} onChange={handleChange}></InFoJD>
          )}
          {step === 3 && (
            <InfoSkill
              skills={data.skillList}
              jd={data.jobCategoryId}
              onChange={handleChange}
            ></InfoSkill>
          )}
        </Box>
        <NavigationButtons
          step={step}
          onBefore={() => setStep(step - 1)}
          onNext={() => setStep(step + 1)}
        ></NavigationButtons>
      </Container>
    </>
  );
}
