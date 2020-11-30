const prod = process.env.NODE_ENV === "production";
console.log(`Loading ${process.env.NODE_ENV} config...`);

export let CONTEXT_PATH = window.location.pathname;

console.log(window.location.path);
console.log(`Loading the following context: ${CONTEXT_PATH}`);

if (!prod && CONTEXT_PATH === "/") {
  CONTEXT_PATH = "";
}

export const SERVER_URL = prod
  ? CONTEXT_PATH
  : `http://localhost:8080${CONTEXT_PATH}`;
