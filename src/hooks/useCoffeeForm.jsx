import { useEffect, useState } from 'react';

const defaultInitialValues = {
  title: '',
  content: '',
  totalRecruitCount: '',
  meetDate: '',
  openChatUrl: '',
};

export const useCoffeeForm = (initialValues = defaultInitialValues) => {
  const [formValue, setFormValue] = useState(initialValues);
  const [helperTexts, setHelperTexts] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const updateFormValue = (field, newValue) => {
    setFormValue((prev) => ({ ...prev, [field]: newValue }));
    validateField(field, newValue);
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

  const isValidUrl = (url) => {
    const pattern = new RegExp('^https://open\\.kakao\\.com/o/[A-Za-z0-9]{8}$');
    return pattern.test(url);
  };

  useEffect(() => {
    const isValid =
      Object.values(helperTexts).every((text) => text === '') &&
      Object.values(formValue).every((value) => value);
    setIsFormValid(isValid);
  }, [formValue, helperTexts]);

  return {
    formValue,
    setFormValue,
    helperTexts,
    isFormValid,
    setIsFormValid,
    updateFormValue,
  };
};
