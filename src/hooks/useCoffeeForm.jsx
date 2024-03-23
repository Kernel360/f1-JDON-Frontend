import { useEffect, useState } from 'react';

import useValidateForm from './useValidateForm';

export const useCoffeeForm = (initialValues) => {
  const createFormValue = (values) => ({
    title: values?.title || '',
    content: values?.content || '',
    totalRecruitCount: values?.totalRecruitCount || '',
    meetDate: values?.meetDate || '',
    openChatUrl: values?.openChatUrl || '',
  });
  const [formValue, setFormValue] = useState(createFormValue(initialValues));
  const { helperTexts, isFormValid, validateField } = useValidateForm(formValue);

  useEffect(() => {
    setFormValue(createFormValue(initialValues));
  }, [initialValues]);

  const updateFormValue = (field, newValue) => {
    setFormValue((prev) => ({ ...prev, [field]: newValue }));
    validateField(field, newValue);
  };

  return {
    formValue,
    setFormValue,
    helperTexts,
    isFormValid,
    updateFormValue,
  };
};
