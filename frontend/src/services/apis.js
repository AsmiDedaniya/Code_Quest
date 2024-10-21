const BASE_URL = process.env.REACT_APP_BASE_URL
console.log("base url",BASE_URL);
export const endpoints = {
   ANSWER_API:BASE_URL+"/allanswer",
   TRANSLATE_API:BASE_URL+"/translate"
  }