import { Box, Chip, Stack, Typography } from "@mui/material";
import { ChipStyle, InfoSkillStyles, infoBasicStyles } from "./InfoStyles";
import { useEffect, useState } from "react";

const FRONT_CHIPS = [
  "HTML",
  "CSS",
  "javascript",
  "typescript",
  "React",
  "Next.js",
  "Vue.js",
  "Angular.js",
  "Node.js",
  "Redux",
];

const BACK_CHIPS = [
  "Node.js",
  "Express.js",
  "Spring Boot",
  "Django",
  "Ruby on Rails",
  "Flask",
  "ASP.NET Core",
  "Go (Golang)",
  "Laravel",
];

function InfoSkill({ jd, skills, onChange }) {
  const [selected, setSelected] = useState([]);
  const handleClick = (newChip) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(newChip)) {
        return prevSelected.filter((chip) => chip !== newChip);
      } else {
        if (prevSelected.length < 3) {
          return [...prevSelected, newChip];
        } else {
          alert("3개만 선택할 수 있습니다");
          return prevSelected;
        }
      }
    });
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]); // selected 상태가 변경될 때마다 로그 출력

  return (
    <>
      <Typography width="100%" sx={infoBasicStyles.typographyTitle}>
        관심 기술 스택을 선택해주세요
      </Typography>
      <Typography width="100%" sx={infoBasicStyles.typographySubtitle}>
        3개 선택해주세요
      </Typography>
      <Box component="form" noValidate sx={infoBasicStyles.formContainer}>
        <Box>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            sx={InfoSkillStyles}
          >
            {FRONT_CHIPS.map((chip, i) => (
              <Chip
                key={i}
                label={chip}
                variant="outlined"
                size="medium"
                clickable={true}
                onClick={() => handleClick(chip)}
                sx={ChipStyle(selected, chip)}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
}
export default InfoSkill;
