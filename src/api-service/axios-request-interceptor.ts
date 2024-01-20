import axios from "axios";

/**
 * Request Interceptor function for axios.
 */
function axiosRequestInterceptor(): void {
  axios.interceptors.request.use(
    (request) => {
      return request;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
}

export default axiosRequestInterceptor;
