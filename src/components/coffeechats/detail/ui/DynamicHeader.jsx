import Header from 'components/common/header/Header';
import { COFFEE_CHILD, COFFEE_MYPAGE_CHILD } from 'constants/headerProps';

function DynamicHeader({ backPath }) {
  if (backPath === '/mypage/coffee') {
    return <Header title={COFFEE_MYPAGE_CHILD.title} url={COFFEE_MYPAGE_CHILD.url} />;
  } else {
    return <Header title={COFFEE_CHILD.title} url={COFFEE_CHILD.url} />;
  }
}
export default DynamicHeader;
