import "./Progressbar.scss";

function ProgressBar({ step }) {
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${(step / 3) * 100}%` }}></div>
    </div>
  );
}

export default ProgressBar;
