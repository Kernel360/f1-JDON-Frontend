import "./Progressbar.scss";

export function ProgressBar() {
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${(5 / 100) * 100}%` }}></div>
    </div>
  );
}
