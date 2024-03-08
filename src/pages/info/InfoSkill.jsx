import { Box, Chip, Stack, Typography } from "@mui/material";
import { ChipStyle, InfoSkillStyles, infoBasicStyles } from "./InfoStyles";
import { useEffect, useState } from "react";
import { getSkillsOnJD } from "api/api";

import { userInfo } from "recoil/atoms";
import { useRecoilState } from "recoil";

function InfoSkill({ onChange }) {
  const [value, setValue] = useRecoilState(userInfo);
  const [selected, setSelected] = useState(value.skillList);
  const [skillsOnJd, setSkillsOnJd] = useState([]);

  const handleClick = (newChip) => {
    setSelected((prev) => {
      if (prev.includes(newChip)) {
        const updatedSelected = prev.filter((chip) => chip !== newChip);
        handleInputChange("skillList", updatedSelected);
        return updatedSelected;
      } else {
        if (prev.length === 3) {
          alert("최대 3개까지 선택할 수 있습니다.");
          return prev;
        } else {
          handleInputChange("skillList", [...prev, newChip]);
          return [...prev, newChip];
        }
      }
    });
    console.log(selected);
  };

  const handleInputChange = async (field, newValue) => {
    setValue((prev) => ({ ...prev, [field]: newValue }));
    onChange({ [field]: newValue });
  };

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await getSkillsOnJD(Number(value.jobCategoryId));
        setSkillsOnJd(res.skillList);
      } catch (error) {
        console.error("Error fetchSkill:", error);
      }
    };
    fetchSkill();
  }, [value.jobCategoryId]);

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
            {skillsOnJd.map((chip, i) => (
              <Chip
                key={i}
                label={chip.keyword}
                variant="outlined"
                size="medium"
                clickable={true}
                onClick={() => handleClick(chip.skillId)}
                sx={ChipStyle(selected, chip.skillId)}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
}
export default InfoSkill;
