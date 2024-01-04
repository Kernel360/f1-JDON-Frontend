import { Box, Chip, Stack, Typography } from "@mui/material";
import { ChipStyle, InfoSkillStyles, infoBasicStyles } from "./InfoStyles";
import { useEffect, useState } from "react";

const CHIPS = [
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

function InfoSkill({ skills, onChange }) {
  const [selectedChip, setSelectedChip] = useState([]);

  const handleClick = (newchip) => {
    if (selectedChip.length < 3) {
      if (selectedChip.includes(newchip)) {
        setSelectedChip(selectedChip.filter((c) => c !== newchip));
      } else {
        setSelectedChip((prev) => [...prev, newchip]);
      }
    } else {
      alert("3개만 선택 가능합니다");
      setSelectedChip(selectedChip.filter((c) => c !== newchip));
    }

    console.log(selectedChip);
  };

  useEffect(() => {
    onChange({ skills: selectedChip });
  }, [selectedChip]);

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
            {CHIPS.map((chip, i) => (
              <Chip
                key={i}
                label={chip}
                variant="outlined"
                onClick={() => handleClick(chip)}
                size="medium"
                clickable={true}
                sx={
                  selectedChip.includes(chip)
                    ? ChipStyle(chip, selectedChip.length)
                    : ChipStyle(null)
                }
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default InfoSkill;
