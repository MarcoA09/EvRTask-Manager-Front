import axios from "axios";
/* import { API_URL } from "../config"; */

const instance = axios.create({
baseURL: import.meta.env.VITE_API_URL,
/* baseURL: API_URL, */
  withCredentials: true,
});

export default instance;
