export const formattedDate = (data) => {
  return data.split(' ')[0].replace(/-/g, '.');
};

export const formattedTime = (data) => {
  return data.split(' ')[1];
};
