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
    marginTop: 1,
    color: "#BCBCC4",
  },
  formContainer: {
    mt: "65px",
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
export const nicknameTextField = (nickname) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: nickname ? "#6482FF" : "#BCBCC4", // 값이 있으면 파란색, 없으면 회색
    },
  },
});
