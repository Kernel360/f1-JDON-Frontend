export const PopupFrame = ({ children }) => {
  return (
    <div
      style={{
        borderRadius: '12px',
        background: 'white',
        width: '90%',
        maxWidth: '900px',
      }}>
      {children}
    </div>
  );
};
