const prod = process.env.NODE_ENV === "production";
console.log(`Loading ${process.env.NODE_ENV} config...`);

export const CONTEXT_PATH = window.location.pathname
  .split("/")
  .slice(0, -2)
  .join("/");

export const SERVER_URL = prod
  ? CONTEXT_PATH
  : `http://localhost:8080${CONTEXT_PATH}`;
