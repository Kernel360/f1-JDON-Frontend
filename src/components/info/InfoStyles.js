// infoBasicStyles.js 파일
export const infoBasicStyles = {
  typographyTitle: {
    fontSize: 24,
    fontWeight: 700,
    marginTop: 2,
    textAlign: "left",
  },
  typographySubtitle: {
    fontSize: 16,
    textAlign: "left",
    color: "#BCBCC4",
  },
  formContainer: {
    mt: "50px",
    display: "flex",
    flexDirection: "column",
    gap: "13px",
    width: "100%",
  },

  datePickerContainer: {
    m: "10px auto",
    width: "100%",
    border: "1px solid #BCBCC4",
    borderRadius: "10px",
    "& .MuiFormControl-root": { width: "100%" },
  },
  datePicker: {
    "& .MuiInputBase-root": { flexGrow: 1 },
    "& .MuiOutlinedInput-root": {
      border: "none",
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  genderButton: {
    height: 56,
    borderRadius: "10px",
    borderColor: "#BCBCC4",
    color: "#BCBCC4",
    "&:hover": {
      backgroundColor: "#E2E7FF",
      color: "#6482FF",
    },
  },
  genderBtnContainer: {
    justifyContent: "space-between",
    m: "10px auto",
    "& .MuiGrid-item": {
      padding: 0,
    },
  },
};

export const duplicateCheckButtonStyle = {
  background: "#F2F2F2",
  color: "#BCBCC4",
  fontSize: "12px",
  padding: "7px",
};
export const datePickerContainer = (birthday) => ({
  m: "10px auto",
  width: "100%",
  border: "1px solid",
  borderColor: birthday ? "#6482FF" : "#BCBCC4", // 조건에 따른 색상 변경
  borderRadius: "10px",
  "& .MuiFormControl-root": { width: "100%" },
});

export const InfoSkillStyles = {
  margin: "20px auto",
  ChipStyle: {
    fontSize: "14px",
    color: "#BCBCC4",
    marginBottom: "10px",
    borderRadius: "999px",
    padding: "24px 12px",
    "&&:hover": {
      background: "#FFEAE1",
      color: "#FF814D",
      borderColor: "#FF814D",
    },
  },
};

export const ChipStyle = (click) => ({
  color: click ? "#6482FF" : "#ADADAD",
  borderColor: click ? "#6482FF" : "#ADADAD",
  background: click ? "#E2E7FF" : "",
  fontSize: "14px",
  padding: "4px",
  height: "38px",
  borderRadius: "999px",
  "&&:hover": {
    background: "#E2E7FF",
    color: "#6482FF",
    borderColor: "#6482FF",
  },
});

export const nicknameTextField = (value) => ({
  margin: "12px auto",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "10px", // 기본 테두리 두께
      borderColor: value ? "#6482FF" : "#BCBCC4",
    },
    "&:hover fieldset": {
      borderColor: "#6482FF",
    },
    "&.Mui-focused fieldset": {
      borderWidth: "1px",
      borderColor: "#6482FF", // 포커스 시 색상 변경 안 함
    },
  },
  "& .MuiInputBase-input": {
    color: "#6482FF", // 입력된 값의 색상
    "&::placeholder": {
      color: "#BCBCC4", // 플레이스홀더의 색상
      opacity: 1, // 브라우저마다 다른 플레이스홀더 투명도 처리를 일관되게 함
    },
  },
});
