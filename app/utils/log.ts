// TODO Implement log levels INFO, DEBUG, ...
export const log = (...args: any) => {
  console.info(...args);
};

export const debug = (...args: any) => {
  process.env.DEBUG && log(...args);
};

export default log;
