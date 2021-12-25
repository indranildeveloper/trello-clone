/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    REACT_APP_BACKEND_ENDPOINT: string;
  }
}
