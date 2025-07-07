import axios from "axios";
import { attachAuthInterceptor, attachErrorHandlerInterceptor } from "./interceptors";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

attachAuthInterceptor(axios);
attachErrorHandlerInterceptor(axios);
