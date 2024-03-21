export const RelativeBox = () => ({
  position: 'relative',
  width: '100%',

  overflow: 'hidden',
});

export const BackgroundImg = {
  position: 'absolute',
  width: '100%',
  top: '50%',
  transform: 'translateY(-50%)',

  filter: 'blur(5px)',
};

export const MainImg = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translateX(-50%) translateY(-50%)',

  borderRadius: '10px',
};
