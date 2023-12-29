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

const INITIAL_DATA = {
  nickname: "",
  birthday: "",
  sex: "",
  jd: "",
  skills: [],
};
export default function Info() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(INITIAL_DATA);
  const navigate = useNavigate();

  const handleChange = (value) => {
    setData((prev) => ({ ...prev, ...value }));
  };

  useEffect(() => {
    console.log(data);
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
          {step === 1 && (
            <InFoBasic
              nickname={data.nickname}
              birthday={data.birthday}
              sex={data.sex}
              onChange={handleChange}
            ></InFoBasic>
          )}
          {step === 2 && <InFoJD jd={data.jd}></InFoJD>}
          {step === 3 && <InfoSkill skills={data.skills}></InfoSkill>}
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
