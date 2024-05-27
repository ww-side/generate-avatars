import axios from 'axios';
import {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
  TooManyRequestsError,
  BadGatewayError,
  InternalServerError,
} from '@utils/http-errors';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 10_000,
  withCredentials: false,
});

axiosInstance.interceptors.response.use(
  null,
  error => {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response?.data?.error;

      console.log('@error', error.response?.data?.error);
      console.log('@errors', error.response?.data?.errors);

      switch (error.response?.status) {
        case 400:
          throw new BadRequestError(errorMessage);
        case 401:
          throw new UnauthorizedError(errorMessage);
        case 404:
          throw new NotFoundError(errorMessage);
        case 409:
          throw new ConflictError(errorMessage);
        case 429:
          throw new TooManyRequestsError(errorMessage);
        case 500:
          throw new InternalServerError(errorMessage);
        case 502:
          throw new BadGatewayError(errorMessage);
      }
    }

    throw error;
  },
  { synchronous: true },
);

export default axiosInstance;
