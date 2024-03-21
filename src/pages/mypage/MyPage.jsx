import { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import ToggleList from 'components/common/ToggleList';
import BottomNav from 'components/common/BottomNav';
import { getFAQ, getJobCategory, getMemberInfo } from 'api/api';
import { kindOfJdState } from 'recoil/atoms';
import { useSetRecoilState } from 'recoil';
import { getNoticeList } from './notice';
import ProfileSection from './ProfileSection';
import NavButtons from './NavButtons';
import LogoutButton from './LogoutButton';

export default function MyPage() {
  const [memberInfo, setMemberInfo] = useState({});
  const [FAQ, setFAQ] = useState([]);
  const setJobCategories = useSetRecoilState(kindOfJdState);
  const noticeLists = getNoticeList(FAQ);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const memberData = await getMemberInfo();
        const faqData = await getFAQ();
        const { jobGroupList } = await getJobCategory();
        setFAQ(faqData.faqList || []);
        setMemberInfo(memberData.data);
        setJobCategories(jobGroupList[0].jobCategoryList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '95vh',
        py: 10,
      }}>
      <ProfileSection data={memberInfo} />
      <NavButtons />
      <ToggleList datas={noticeLists} />
      <Box sx={{ flexGrow: 1 }} />
      <LogoutButton />
      <BottomNav />
    </Container>
  );
}
