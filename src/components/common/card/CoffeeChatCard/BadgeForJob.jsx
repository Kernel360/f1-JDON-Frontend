import { jobStyle } from "../CardStyle";

function BadgeForJob({ jobNum, data }) {
  return (
    <>
      {data.job && (
        <div color="#FF814D" style={jobStyle(jobNum)}>
          {data.job}
        </div>
      )}
    </>
  );
}

export default BadgeForJob;
