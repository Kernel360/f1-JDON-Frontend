import { BeatLoader } from 'react-spinners';

function Loading() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.6)',
      }}>
      <BeatLoader />
    </div>
  );
}

export default Loading;
