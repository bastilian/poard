export const log = (...args: any) => {
  console.info(...args)
}

export const debug = (...args: any) => {
  process.env.DEBUG && log(...args);
}

export default log
