const { Box } = require('@mui/material');
const { getJobCategory } = require('api/api');
const { jobStyle } = require('components/common/card/CardStyle');
const { useEffect, useState } = require('react');

export const JobBadge = ({ job }) => {
  const [jobCategoryList, setJobCategoryList] = useState();
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const res = await getJobCategory();
        setJobCategoryList(res.jobGroupList[0].jobCategoryList);
      } catch (e) {
        console.log(e);
      }
    };
    fetchJobData();
  }, []);
  const jobNum = jobCategoryList?.find((jd) => jd.name === job)?.id;
  return jobNum ? <Box sx={jobStyle(jobNum)}>{job}</Box> : null;
};
