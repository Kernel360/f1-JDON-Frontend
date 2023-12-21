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

  useEffect(() => {
    if (step === 4) navigate("../");
  });

  return (
    <>
      <ProgressBar step={step}></ProgressBar>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {step === 1 && <InFoBasic></InFoBasic>}
          {step === 2 && <InFoJD></InFoJD>}
          {step === 3 && <InfoSkill></InfoSkill>}
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
