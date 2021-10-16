export const logger = (msg, ctx = "default") => {
  console.log("[" + ctx + "]: ", msg);
};
