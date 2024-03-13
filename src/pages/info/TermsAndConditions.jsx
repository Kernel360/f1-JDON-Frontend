import { AGREE_DATA } from './agreeData';

function TermsAndConditions(i) {
  return (
    <div>
      {AGREE_DATA[i].children.map((item, index) => (
        <div key={index}>
          <h4 style={{ fontSize: 16 }}>{item.title}</h4>
          <p style={{ fontSize: 12 }}>{item.content}</p>
        </div>
      ))}
    </div>
  );
}

export default TermsAndConditions;
