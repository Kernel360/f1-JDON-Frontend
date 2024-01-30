import { theme } from "../../styles/themeMuiStyle";

export const InfoStyle = {
  FrameContainer: {
    paddingTop: 6,
    paddingBottom: 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

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
    color: theme.palette.primary.gray500,
  },
  formContainer: {
    mt: "50px",
    display: "flex",
    flexDirection: "column",
    gap: "13px",
    width: "100%",
  },

  clickedGenderButton: {
    backgroundColor: "#E2E7FF",
    color: "#6482FF",
    borderColor: theme.palette.primary.main,
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
  color: theme.palette.primary.gray500,
  fontSize: "12px",
  padding: "7px",
  border: "none",
};

export const OptionButton = (isSelected) => ({
  height: 56,
  borderRadius: "10px",
  borderColor: isSelected ? "#6482FF" : theme.palette.primary.gray500,
  color: isSelected ? "#6482FF" : theme.palette.primary.gray500,
  backgroundColor: isSelected && "#E2E7FF",
  "&:hover": {
    backgroundColor: "#E2E7FF",
    color: "#6482FF",
  },
});
export const datePickerContainer = (birthday) => ({
  m: "8px auto",
  border: "1px solid",
  display: "flex",
  justifyContent: "space-between",
  borderColor: birthday ? "#6482FF" : theme.palette.primary.gray500, // 조건에 따른 색상 변경
  borderRadius: "10px",
});
export const datePicker = (birthday) => ({
  display: "flex",
  justifyContent: "space-between",
  flexGrow: 1,
  "& .MuiInputBase-root": {
    display: "flex",
    justifyContent: "space-between",
    color: birthday
      ? theme.palette.primary.main
      : theme.palette.primary.gray500,
  },
  "& .MuiOutlinedInput-root": {
    border: "none",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

export const InfoSkillStyles = {
  margin: "20px auto",
  ChipStyle: {
    fontSize: "14px",
    color: theme.palette.primary.gray500,
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

export const ChipStyle = (selected, chip) => ({
  color: selected.includes(chip) ? "#6482FF" : "#ADADAD",
  borderColor: selected.includes(chip) ? "#6482FF" : "#ADADAD",
  background: selected.includes(chip) ? "#E2E7FF" : "",
  fontSize: "14px",
  padding: "4px",
  height: "38px",
  borderRadius: "999px",
  "&&:hover": {
    background: selected.includes(chip) ? "#E2E7FF" : "white",
    color: selected.includes(chip) ? "#6482FF" : "#ADADAD",
    borderColor: selected.includes(chip) ? "#6482FF" : "#ADADAD",
  },
});

export const nicknameTextField = (value) => ({
  margin: "8px auto",
  background: "none",
  width: "100%",
  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 1000px white inset",
    WebkitTextFillColor: "black", // 텍스트 색상을 여기서 조정
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px", // 기본 테두리 두께
    background: "white",
    width: "100%",
    "& fieldset": {
      background: "none",
      width: "100%",
      borderColor: value
        ? theme.palette.primary.main
        : theme.palette.primary.gray500,
    },
    "&:hover fieldset": {
      width: "100%",
      borderColor: value
        ? theme.palette.primary.main
        : theme.palette.primary.gray500,
    },
    "&.Mui-focused fieldset": {
      width: "100%",
      borderWidth: "1px",
      borderColor: value
        ? theme.palette.primary.main
        : theme.palette.primary.gray500, // 포커스 시 색상 변경 안 함
    },
  },
  "& .MuiInputBase-input": {
    width: "100%",
    color: "#6482FF", // 입력된 값의 색상
    "&::placeholder": {
      color: theme.palette.primary.gray500, // 플레이스홀더의 색상
      opacity: 1, // 브라우저마다 다른 플레이스홀더 투명도 처리를 일관되게 함
    },
  },
});

export const skillsButton = (value) => ({
  margin: "12px auto",
  padding: "16px 10px",
  borderRadius: "10px",
  border: `1px solid ${theme.palette.primary.gray500}`,
  textalign: "left",
  fontSize: "16px",
  // color: "#6482FF",
  color: theme.palette.primary.gray500,
  "&:hover": {
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
  },
});
