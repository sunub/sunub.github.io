export const baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_PORT
    : process.env.DEPLOY_PORT;
