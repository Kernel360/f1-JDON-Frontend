import { theme } from "../../styles/themeMuiStyle";

export const InfoStyle = {
  FrameContainer: {
    paddingTop: 6,
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

  genderButton: {
    height: 56,
    borderRadius: "10px",
    borderColor: theme.palette.primary.gray500,
    color: theme.palette.primary.gray500,
    "&:hover": {
      backgroundColor: "#E2E7FF",
      color: "#6482FF",
    },
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
};

export const datePickerContainer = (birthday) => ({
  m: "10px auto",
  border: "1px solid",
  width: "100%",
  borderColor: birthday ? "#6482FF" : theme.palette.primary.gray500, // 조건에 따른 색상 변경
  borderRadius: "10px",
});
export const datePicker = (birthday) => ({
  "& .MuiInputBase-root": {
    background: "red",
    display: "flex",
    width: "1000px",
    flexGow: 1,
    color: birthday
      ? theme.palette.primary.main
      : theme.palette.primary.gray500,
  },
  "& .MuiOutlinedInput-root": {
    border: "none",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
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
  margin: "12px auto",
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px", // 기본 테두리 두께
    "& fieldset": {
      borderColor: value
        ? theme.palette.primary.main
        : theme.palette.primary.gray500,
    },
    "&:hover fieldset": {
      borderColor: value
        ? theme.palette.primary.main
        : theme.palette.primary.gray500,
    },
    "&.Mui-focused fieldset": {
      borderWidth: "1px",
      borderColor: value
        ? theme.palette.primary.main
        : theme.palette.primary.gray500, // 포커스 시 색상 변경 안 함
    },
  },
  "& .MuiInputBase-input": {
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
