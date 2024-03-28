export const delay = (time) =>
  new Promise((resolve) => {
    setTimeout(() => resolve('delay종료'), time);
  });
