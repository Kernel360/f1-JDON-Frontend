import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { InFoBasic } from "../components/info/InFoBasic";
import { ProgressBar } from "../components/Progressbar";
import { InFoJD } from "../components/info/InfoJD";
import { NavigationButtons } from "../components/navigation-btn/NavigationBtn";
import { InfoSkill } from "../components/info/InfoSkill";
import { useNavigate } from "react-router-dom/dist";

export default function Info() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const DATA = {
    nickname: "",
    birthday: "",
    sex: "",
    jd: "",
    skills: [],
  };

  useEffect(() => {
    if (step === 0) {
      navigate("../");
    }
    if (step === 4) navigate("../main");
  });

  return (
    <>
      <ProgressBar step={step}></ProgressBar>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {step === 1 && <InFoBasic DATA={DATA}></InFoBasic>}
          {step === 2 && <InFoJD jd={DATA.jd}></InFoJD>}
          {step === 3 && <InfoSkill skills={DATA.skills}></InfoSkill>}
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
