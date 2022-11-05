export const labelColor = (ts: number | string) => {
  const s = new Date().getTime() / 1000 - parseInt(ts as string);
  if (s < 5 * 86400) {
    return 'green';
  }
  if (s < 90 * 86400) {
    return 'yello';
  }
  return 'red';
};

export const age = (ts: number | string) => {
  const s = Math.trunc(
    (new Date().getTime() / 1000 - parseInt(ts as string)) / 86400
  );
  if (s < 1) {
    return 'new';
  }
  if (s < 31) {
    return s.toString() + 'd';
  }
  return Math.trunc(s / 7).toString() + 'w';
};
