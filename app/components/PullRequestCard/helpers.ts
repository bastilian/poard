export const labelColor = (ts) => {
  const s = (new Date()).getTime() / 1000 - ts;
  if (s < 5 * 86400) { return 'green' }
  if (s < 90 * 86400) { return 'yello' }
  return 'red';
};

export const age = (ts) => {
  let s = (new Date()).getTime() / 1000 - ts;
  s = parseInt(s / 86400);
  if (s < 1) { return 'new' }
  if (s < 31) { return s.toString() + 'd' }
  return parseInt(s / 7).toString() + 'w';
};
