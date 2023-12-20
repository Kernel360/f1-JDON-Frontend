import { Box, Chip, Stack, Typography } from "@mui/material";
import { InfoSkillStyles, infoBasicStyles } from "./InfoStyles";

export function InfoSkill() {
  const CHIPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <>
      <Typography width="100%" sx={infoBasicStyles.typographyTitle}>
        관심 기술 스택을 선택해주세요
      </Typography>
      <Typography width="100%" sx={infoBasicStyles.typographySubtitle}>
        3개 선택해주세요
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={infoBasicStyles.formContainer}
      >
        <Box>
          <Stack
            direction="row"
            spacing={2}
            useFlexGap
            flexWrap="wrap"
            sx={InfoSkillStyles}
          >
            {CHIPS.map((chip, i) => (
              <Chip
                key={i}
                label={`Item ${i}`}
                variant="outlined"
                onClick={handleClick}
                size="medium"
                sx={{
                  fontSize: "16px",
                  color: "#BCBCC4",
                  borderRadius: "999px",
                  padding: "24px 12px",
                  "& .MuiChip-label": {
                    padding: "12px",
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
}
