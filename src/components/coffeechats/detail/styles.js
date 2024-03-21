export const CoffeeDetailStyles = {
  Container: {
    position: 'relative',
    width: '100%',
    flexGrow: 1,
    '& .MuiContainer-root': {
      padding: 0,
      width: '100%',
      gap: 10,
      flexGrow: 1,
    },
  },
  BtnsContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
  },

  Button: {
    mt: 5,
    mb: 2,
    py: '13px',
    borderRadius: '999px',
    background: '#EBEBEB',
    color: '#BCBCC4',
    fontSize: '16px',
    '&:hover': {
      color: '#ffffff',
      backgroundColor: '#6482FF',
    },
  },
  ShareButton: {
    mt: 5,
    mb: 2,
    py: '13px',
    borderRadius: '10px',
    background: 'white',
    border: '1px solid #6482FF',
    fontSize: '16px',
    width: '100%',
  },

  UpTitle: {
    px: '6px',
    paddingTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

export const TitleStyle = () => ({
  px: '6px',
  fontSize: '20px',
  mt: '22px',
  wordWrap: 'break-word',
  whiteSpace: 'normal',
});

export const DetailInfoBoxStyle = () => ({
  borderRadius: '10px',
  width: '100%',
  heigth: '64px',
  background: '#F3F5FF',
  my: '24px',
  py: '16px',
  px: '16px',
});

export const recruitInfoStyle = () => ({
  pb: '10px',
  color: '#373737',
  fontWeight: '600',
  fontSize: '15px',
});
export const ContentStyle = () => ({
  color: '#545459',
  minHeight: '180px',
  wordWrap: 'break-word',
  whiteSpace: 'normal',
  pt: 2,
  mb: 3,
});

export const InfoItemStyle = () => ({
  pb: '5px',
  color: '#696969',
  fontSize: '15px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const viewCountContainerStyle = () => ({
  color: '#B9B9B9',
  fontSize: '12px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});
