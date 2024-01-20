import axios from "axios";
import { toast } from "react-toastify";

/**
 * Response Interceptor function for axios.
 */
function axiosResponseInterceptor(): void {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

export default axiosResponseInterceptor;
