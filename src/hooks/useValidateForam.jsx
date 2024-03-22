import { useEffect, useState } from 'react';

function useValidateForm(formValue) {
  const [helperTexts, setHelperTexts] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const isValidUrl = (url) => {
    const pattern = new RegExp('^https://open\\.kakao\\.com/o/[A-Za-z0-9]{8}$');
    return pattern.test(url);
  };

  const validateField = (field, value) => {
    let helperText = '';
    switch (field) {
      case 'title':
        helperText =
          value.length < 10 || value.length > 50 ? '제목은 10자 이상 50자 이하로 작성해주세요' : '';
        break;
      case 'content':
        helperText =
          value.length < 50 || value.length > 500
            ? '내용은 50자 이상 500자 이하로 작성해주세요'
            : '';
        break;
      case 'totalRecruitCount':
        helperText =
          value > 100 || value < 1 ? '모집인원은 1명 이상 100명 이하로 설정해주세요' : '';

        break;
      case 'openChatUrl':
        helperText = value && !isValidUrl(value) ? 'URL형식이 올바르지 않습니다' : '';
        break;
      default:
        return;
    }
    setHelperTexts((prev) => ({ ...prev, [field]: helperText }));
  };
  useEffect(() => {
    const isValid =
      Object.values(helperTexts).every((text) => text === '') &&
      Object.values(formValue).every((value) => value);
    setIsFormValid(isValid);
  }, [formValue, helperTexts]);

  return { helperTexts, isFormValid, validateField };
}

export default useValidateForm;
