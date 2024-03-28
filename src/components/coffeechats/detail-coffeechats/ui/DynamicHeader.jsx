import Header from 'components/common/header/Header';
import { COFFEE_CHILD } from 'constants/headerProps';

function DynamicHeader({ backPath }) {
  if (backPath) return <Header title={'이전으로'} url={backPath} />;
  else return <Header title={COFFEE_CHILD.title} url={COFFEE_CHILD.url} />;
}
export default DynamicHeader;
