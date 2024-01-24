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

const CHIP_MAP = {
  1: FRONT_CHIPS,
  2: BACK_CHIPS,
};

function InfoSkill({ jobCategoryId, skills, onChange }) {
  const [selected, setSelected] = useState(skills);

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
    onChange({ skillList: selected });
  }, [selected, onChange]);

  const chipsToRender = CHIP_MAP[jobCategoryId] || [];

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
            {chipsToRender.map((chip, i) => (
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
