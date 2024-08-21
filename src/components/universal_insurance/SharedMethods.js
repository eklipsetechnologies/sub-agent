import { Base64 } from "js-base64";
import axios from "axios";

export const convertToBase64 = (id, key) => {
  return Base64.encode(`${id}:${key}`);
};

export const setAuthBase64 = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  }
};
