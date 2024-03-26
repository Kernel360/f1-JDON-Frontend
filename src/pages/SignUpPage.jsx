import { useEffect, useState } from 'react';

import { getJobCategory, registerUserInfo } from 'api/api';
import NavigationButtons from 'components/common/button/NavigationBtn';
import ProgressBar from 'components/common/Progressbar';
import { InfoStyle } from 'components/member/sign-up/InfoStyles';
import StepForBasic from 'components/member/sign-up/ui/StepForBasic';
import StepForJob from 'components/member/sign-up/ui/StepForJob';
import StepForSkills from 'components/member/sign-up/ui/StepForSkills';
import { useNavigate } from 'react-router-dom/dist';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isLoggedInState, userInfo } from 'recoil/atoms';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import SignUpSuccessPage from './SignUpSuccessPage';

export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [agree, setAgree] = useState({});
  const [data, setData] = useRecoilState(userInfo);
  const [jobCategory, setJobCategory] = useState();
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState(isLoggedInState);

  const handleChange = (value) => {
    setData((prev) => ({ ...prev, ...value }));
  };

  const handleNextBtn = () => {
    if (
      step === 1 &&
      !(
        data.nickname &&
        data.birth &&
        data.gender &&
        Object.values(agree).every((value) => value === true)
      )
    ) {
      alert('입력되지 않은 값이 있습니다.');
      return false;
    }
    if (step === 2 && !data.jobCategoryId) {
      alert('직무를 선택해주세요.');
      return false;
    }
    if (step === 3 && data.skillList.length !== 3) {
      alert('최소 3가지의 관심 기술을 선택해야 합니다.');
      return false;
    }
    setStep(step + 1);
    return true;
  };

  useEffect(() => {
    if (step === 0) {
      navigate('/');
    }
    if (step === 4) {
      const registerData = async () => {
        try {
          await registerUserInfo(data);
        } catch (error) {
          const { message } = error.response.data;
          alert(message);
          navigate('/fail');
        }
      };
      registerData();
    }
  }, [step, data, navigate, setIsLogin]);

  useEffect(() => {
    if (!data.encrypted) {
      alert('이미 JDON 회원이세요!');
      navigate('/');
    }
    (async () => {
      try {
        const data = await getJobCategory();
        setJobCategory(data.jobGroupList[0].jobCategoryList);
      } catch (error) {
        console.error('Error fetching hot skills:', error);
      }
    })();
  }, [navigate, data.encrypted]);

  const renderStepComponent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <StepForBasic step={step} onChange={handleChange} agree={agree} setAgree={setAgree} />
            <NavigationButtons
              step={step}
              isActive={
                data.nickname &&
                data.birth &&
                data.gender &&
                Object.values(agree).every((value) => value === true)
              }
              onBefore={() => setStep(step - 1)}
              onNext={handleNextBtn}
            />
          </>
        );
      case 2:
        return (
          <>
            <StepForJob
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
            <StepForSkills step={step} onChange={handleChange} />
            <NavigationButtons
              step={step}
              isActive={data.skillList.length === 3}
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
    <div style={{ position: 'relative' }}>
      {step < 4 && <ProgressBar step={step} />}
      <Container maxWidth="sm">
        <CssBaseline />
        {step < 4 && <Box sx={InfoStyle.FrameContainer}>{renderStepComponent()}</Box>}
        {step === 4 && <SignUpSuccessPage />}
      </Container>
    </div>
  );
}
