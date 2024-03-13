import { jobStyle } from '../CardStyle';

function BadgeForJob({ jobNum, data }) {
  return (
    <>
      {data.hostJobCategoryName && (
        <div color="#FF814D" style={jobStyle(jobNum)}>
          {data.hostJobCategoryName}
        </div>
      )}
    </>
  );
}

export default BadgeForJob;
