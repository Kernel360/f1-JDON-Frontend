import { BadgeStyle } from '../card/CardStyle';

function BadgeForStatus({ data }) {
  return <div style={BadgeStyle(data)}>{data}</div>;
}
export default BadgeForStatus;
