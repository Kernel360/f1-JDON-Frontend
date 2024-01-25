import { FormLabel } from "@mui/material";
import { theme } from "../../../styles/themeMuiStyle";

function TotalInputForm({ value, label, valid, helperText, children }) {
  return (
    <div
      style={{
        position: "relative",
        padding: "4px 0 16px",
      }}
    >
      <FormLabel sx={{ fontSize: "14px", fontWeight: 500 }}>{label}</FormLabel>
      {children}
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          left: "2px",
          fontSize: "12px",
          color: valid ? theme.palette.primary.main : "red",
        }}
      >
        {value && helperText}
      </div>
    </div>
  );
}

export default TotalInputForm;
