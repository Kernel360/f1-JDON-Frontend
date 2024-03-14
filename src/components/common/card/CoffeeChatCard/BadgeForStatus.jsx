import { BadgeStyle } from '../CardStyle';

function BadgeForStatus({ data }) {
  return <div style={BadgeStyle(data.activeStatus)}>{data.activeStatus}</div>;
}
export default BadgeForStatus;
